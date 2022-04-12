import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Divider, Form, FormInstance, Input } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginAndGetUser } from '@/api';
import Wrapper from '@/components/Wrapper';

export default function login() {
  const formRef = useRef<FormInstance>(null);
  const navigate = useNavigate();
  const handleLogin = () => {
    const values = formRef.current?.getFieldsValue();
    loginAndGetUser(values.username, values.password).then((res) => {
      localStorage.setItem('token', JSON.stringify(res.data[0])); //for easy,use user obj as token
      navigate('/');
    });
  };

  return (
    <Wrapper className="flex justify-center pt-24">
      <div className="w-72">
        <Avatar
          size={50}
          className="!bg-primary  absolute left-1/2 transform -translate-x-1/2"
          icon={<UserOutlined />}
        ></Avatar>
        <Divider>
          <span className="text-lg font-medium">Login</span>
        </Divider>
        <Form
          ref={formRef}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            wrapperCol={{ span: 24 }}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password
              className="!bg-white"
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className=" w-full"
              onClick={handleLogin}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
}
