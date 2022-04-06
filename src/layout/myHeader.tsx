import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React from 'react';

interface Iprops {
  collapsed: boolean;
  setcollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MyHeader(props: Iprops) {
  return (
    <div className="flex items-center">
      <span
        className="cursor-pointer hover:text-primary"
        onClick={() => {
          props.setcollapsed(!props.collapsed);
        }}
      >
        {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
      <Breadcrumb className="!m-4 select-none">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
