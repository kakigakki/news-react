import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Form,
  FormInstance,
  Input,
  message,
} from 'antd';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginAndGetUser } from '@/api';
import Wrapper from '@/components/Wrapper';
import { WRONG_USER } from '@/constants/message';

export default function login() {
  const formRef = useRef<FormInstance>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, []);

  const handleLogin = () => {
    const values = formRef.current?.getFieldsValue();
    loginAndGetUser(values.username, values.password).then((res) => {
      if (res.data[0]) {
        localStorage.setItem('token', JSON.stringify(res.data[0])); //for easy,use user obj as token
        const redirect = (location.state as any)?.redirect;
        navigate(redirect ? redirect : '/home');
      } else {
        message.error(WRONG_USER);
      }
    });
  };

  const handleDemoLogin = () => {
    localStorage.setItem('token', 'demoToken'); //for easy,use user obj as token
    navigate('/home');
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
              Login
            </Button>
            <Button type="dashed" className="w-full mt-2" onClick={handleDemoLogin}>
              Demo Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
}
