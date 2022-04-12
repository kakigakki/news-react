import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Divider, Form, Input } from 'antd';
import React from 'react';

import Wrapper from '@/components/Wrapper';

export default function login() {
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
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="on"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className=" w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
}
