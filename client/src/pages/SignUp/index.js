import React,{ useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client';

//antd assets/components
import { Form, Input, Button } from 'antd';

//mutation
import { CREATE_USER } from '../../mutations/auth'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
  
const SignUp = () => {

  let history = useHistory();

  const [errMsg,setErrMsg] = useState("");

  const [createUser, { data }] = useMutation(CREATE_USER);

  useEffect(() => {
    if (localStorage.getItem("userId")) history.goBack();
  }, [])

  useEffect(() => {
    if (data) {
      if (data.createUser.success === false) setErrMsg(`Error: ${ data.createUser.message }`)    
      else {
        localStorage.setItem("userId", data.createUser.userId)
        history.push('/')
      } 
    }
  }, [data])

  const handleFinish = async ({ fullName, email, password }) => {
    try { 
      await createUser({ variables: { userInput: { password, name: fullName, email }}})
    } catch (err) {
      setErrMsg(`Error: ${ err.message }`)
    }
  }

  return (
    <div className="form-wraper">
      <h1>Sign Up</h1>
      <Form
        { ...layout }
        className="form"
        name="basic"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Please input your Fullname!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Invalid Email!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <label className="error-massage">{ errMsg }</label>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item { ...tailLayout }>
          <Button type="primary" htmlType="submit">
            SignUp
          </Button>
        </Form.Item>
      </Form>
    </div> 
  );
}

export default SignUp
