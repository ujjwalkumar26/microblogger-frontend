import React, {useState} from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Card, Form, Input, Button,  Alert} from 'antd';
// import { Spin } from 'antd';

function CreateComment({ postId, user}) {
    const [errors, setErrors] = useState({});
    const [form] = Form.useForm();
    const [commentBody, setCommentBody] = useState("");

    // const [ submitComment, { loading } ] = useMutation(CREATE_COMMENT_MUTATION, {

    const [ submitComment ] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setCommentBody("");
            form.resetFields(["CommentInput"]);
        },
        onError(error) {
            console.log(error);
            setErrors(error.graphQLErrors[0].extensions.errors);
        },
        variables: { postId, body: commentBody }
    });

    return (
        <div>

            {/* { loading && (<div className="loading-spinner"><Spin size = "middle"/></div>) } */}

            <Card 
                style={{ "width": "80%", marginLeft: '8%', marginRight: '2%', marginTop: '2%', marginBottom: '2%'}}
            >
                <Form 
                    form={form}
                    layout = "vertical" 
                    onFinish = {submitComment} 
                    initialValues={{remember: false}}
                    autoComplete = "off"
                    // hidden = {loading} 
                >
                    <Form.Item 
                        label="Post a comment"
                        name = "CommentInput" 
                        onChange = {(event) => setCommentBody(event.target.value)}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>

                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            disabled = {commentBody.trim() === ""}
                        >
                            Post
                        </Button>

                    </Form.Item>

                </Form>
            </Card>

            {
                
                Object.keys(errors).length > 0 && (
                    <div style={{margin: "auto", width: "40%"}} >
                    {
                        Object.values(errors).map(err => (<Alert message={err} key = {err} type="error" showIcon/>))
                    }
                    </div>
                )
                  
            }
        </div>
    )
}

export default CreateComment;


const CREATE_COMMENT_MUTATION = gql `

    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body ) {
            id 
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }

`