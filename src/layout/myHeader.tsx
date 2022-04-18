import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Tooltip } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IUser } from '@/interface';

interface MyHeaderProps {
  collapsed: boolean;
  setcollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MyHeader(props: MyHeaderProps) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('token')!) as IUser;
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="flex justify-between">
      {/* left side */}
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
      {/* right side */}
      <div className="flex items-center">
        <span className="bg-white px-3 rounded-sm mr-2 hover:text-primary text-size-4 ">
          {user.username}
        </span>
        <Tooltip placement="bottom" title="退出登录" mouseEnterDelay={0} color="#27AE60">
          <Button
            className="mr-2"
            shape="circle"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          />
        </Tooltip>
      </div>
    </div>
  );
}
