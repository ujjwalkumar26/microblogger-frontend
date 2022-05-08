import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert, Spin } from 'antd';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../context/auth';
import MenuBar from '../components/MenuBar';

function SignIn() {

  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data : { loginUser: userData }}) {
      context.login(userData);
      navigate("/");
    }, 
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });


  const onChange = (event) => {
    setValues({...values, [event.target.id]: event.target.value});
  };


  const onFinish = (Event) => {
    loginUser();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div >
    <MenuBar/>
    {loading && (<div className="loading-spinner"><Spin size = "large"/></div>)}
    <Form
      labelCol={{ offset : 8, span: 16 }}
      wrapperCol={{offset : 8,  span: 8 }}
      initialValues={{  }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      colon = {false}
      layout = "vertical"
      style={{margin: "5%"}}
      hidden = {loading}
    >
      <Form.Item
        label="Username"
        name="username"
        validateStatus= {Object.keys(errors).find(err => err === "username") ? "error" : ""}
        onChange = {onChange}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        validateStatus= {Object.keys(errors).find(err => err === "password") ? "error" : ""}
        onChange = {onChange}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>

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
  );
};

const LOGIN_USER = gql `
  mutation loginUser(
    $username: String!
    $password: String!
  ) {
    loginUser(
        username: $username
        password: $password
    ) {
      id username createdAt email token
    }
  }

`
export default SignIn;
