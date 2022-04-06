import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

export default function MyContent() {
  return (
    <Content className="p-6 bg-white ml-4 mr-2 rounded-lg">
      <Outlet></Outlet>
    </Content>
  );
}
