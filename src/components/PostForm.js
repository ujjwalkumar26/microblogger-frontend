import React, { useState } from "react";
import { Form, Input, Button, Alert, Spin, Tag } from "antd";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import FETCH_POSTS_QUERY from "../util/graphql";

function PostForm() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  // const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    body: "",
  });
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);
  const handleTagAdd = (tag) => {
    setTags([...tags, tag]);
    setCurrentTag("");
  };
  const handleTagRemove = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      // console.log(result);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
        variables: values,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: data,
      });
      setValues({ body: "" });
      form.resetFields();
      // window.location.reload();
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.errors);
      // navigate('/');
    },
    variables: values,
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const onFinish = (Event) => {
    createPost();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {loading && (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      )}
      <Form
        form={form}
        labelCol={{ offset: 8, span: 16 }}
        wrapperCol={{ offset: 8, span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        colon={false}
        layout="vertical"
        style={{ margin: "5%" }}
        hidden={loading}
      >
        <Form.Item
          label="Create a post!"
          name="body"
          validateStatus={
            Object.keys(errors).find((err) => err === "body") ? "error" : ""
          }
          onChange={onChange}
        >
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item label="Add tags">
          <Input.Search
            allowClear
            enterButton="Add Tag"
            placeholder="Enter tag"
            onSearch={(value) => value && handleTagAdd(currentTag)}
            onChange={(Event) => setCurrentTag(Event.target.value)}
          />
          {tags.map((tag) => (
            <Tag closable onClose={() => handleTagRemove(tag)}>
              {tag}
            </Tag>
          ))}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div style={{ margin: "auto", width: "40%" }}>
          {Object.values(errors).map((err) => (
            <Alert message={err} key={err} type="error" showIcon />
          ))}
        </div>
      )}
    </div>
  );
}

const CREATE_POST = gql`
  mutation ($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export default PostForm;
