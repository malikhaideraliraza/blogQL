import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client';

//antd assets/components
import { Form, Input, Button } from 'antd';

//mutation
import { CREATE_POST } from '../../mutations/post'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
  
const CreatePost = () => {

  let history = useHistory();

  // states
  const [errMsg, setErrMsg] = useState("");
  const [createPost, { data }] = useMutation(CREATE_POST);

  useEffect(() => {
    if (!localStorage.userId) history.push("/")
  }, [])

  useEffect(() => {
    if (data && data.createPost) {
      if (!data.createPost.success) setErrMsg(data.createPost.message);
      else history.push({ pathname: '/post-details', state: { post: { ...data.createPost.post, likesData: [] }}});
    }
  }, [data])

  const handleFinish = async val => {
    try {
      await createPost({ variables: { postInput: { title: val.title, body: val.body }}});
    } catch(err) {
      setErrMsg(`Error: ${ err.message }`);
    }
  }

  return (
    <div className="form-wraper">
      <h1>Create Post</h1>
      <Form
        { ...layout }
        className="form"
        name="create-post-form"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your Title!',
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Post Body"
          name="body"
          rules={[
            {
              required: true,
              message: 'Put All Text Content here...!',
            }
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <label className="error-massage">{ errMsg }</label>
        <Form.Item { ...tailLayout }>
          <Button type="primary" htmlType="submit">Post</Button>
        </Form.Item>
      </Form>
    </div> 
  );
}

export default CreatePost;
