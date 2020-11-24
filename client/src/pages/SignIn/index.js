import React,{ useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useLazyQuery } from '@apollo/client';

//antd assets/components
import { Form, Input, Button } from 'antd';

//queries
import { LOGIN } from '../../queries/auth'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SignIn = () => {

  let history = useHistory();

  //state
  const [errMsg, setErrMsg] = useState("");
  
  const [logIn, { data }] = useLazyQuery(LOGIN);

  useEffect(() => {
    if (localStorage.getItem("userId")) history.goBack();
  }, [])

  useEffect(() => {
    if (data) {
      if (data.login.success === false) setErrMsg(`Error: ${ data.login.message }`)
      else {
        localStorage.setItem("userId", data.login.userId);
        history.push('/')
      } 
    }
  }, [data])

  const handleSignIn = async (val) => {

    if (!val.email.includes("@")) return setErrMsg("Invalid Email")

    try { 
      await logIn({ variables: { password: val.password, email: val.email }})
    } catch(err) {
      setErrMsg(`Error: ${ err.message }`)
    }  
  }

  return (
    <div className="form-wraper">
      <h1>Sign In</h1>
      <Form
        { ...layout }
        className="form"
        name="basic"
        onFinish={handleSignIn}
      >
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
          ]}>
           <Input />
        </Form.Item>
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
        <label className="error-massage">{ errMsg }</label>
        <Form.Item { ...tailLayout }>
          <Button type="primary" htmlType="submit">
            SignIn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignIn;
