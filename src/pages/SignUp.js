import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert, Spin } from 'antd';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useNavigate } from "react-router-dom";
import MenuBar from '../components/MenuBar';
import {AuthContext} from '../context/auth';


function SignUp() {
  
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // eslint-disable-next-line
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data : { registerNewUser: userData }}) {
      // console.log(userData);
      context.login(userData);
      navigate("/");
    }, 
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });


  const onChange = (event) => {
    // console.log(event.target);
    setValues({...values, [event.target.id]: event.target.value});
  };


  const onFinish = (Event) => {
    // console.log('Success:', Event);
    // console.log(values)
    addUser();
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
        label="Email"
        name="email"
        validateStatus= {Object.keys(errors).find(err => err === "email") ? "error" : ""}
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

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        validateStatus= {Object.keys(errors).find(err => err === "confirmPassword") ? "error" : ""}
        onChange = {onChange}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

    {
      Object.keys(errors).length > 0 && (
        <div style={{margin: "auto", width: "40%"}} >
          {
            Object.values(errors).map(err => (<Alert key = {err} message={err} type="error" showIcon/>))
          }
        </div>
      )
    }

    </div>
  );
};

const REGISTER_USER = gql `
  mutation registerNewUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerNewUser(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id username createdAt email token
    }
  }

`
export default SignUp;
