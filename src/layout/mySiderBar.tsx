/* eslint-disable react/jsx-key */
import { HomeOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRights } from '@/api';

import { IMenu } from './interface';
const { SubMenu } = Menu;
const { Sider } = Layout;

interface IProps {
  collapsed: boolean;
}

const iconMap = new Map([
  ['/home', <UserOutlined />],
  ['/user-manage', <UserOutlined />],
  ['/user-manage/add', <UserOutlined />],
  ['/user-manage/delete', <UserOutlined />],
  ['/user-manage/list', <UserOutlined />],
  ['/right-manage', <UserOutlined />],
  ['/right-manage/list', <UserOutlined />],
  ['/right-manage/right', <UserOutlined />],
  ['/news-manage', <UserOutlined />],
  ['/news-manage/list', <UserOutlined />],
  ['/news-manage/draft', <UserOutlined />],
  ['/news-manage/category', <UserOutlined />],
  ['/audit-manage', <UserOutlined />],
  ['/audit-manage/list', <UserOutlined />],
  ['/publish-manage', <UserOutlined />],
  ['/publish-manage/unpublished', <UserOutlined />],
  ['/publish-manage/published', <UserOutlined />],
  ['/publish-manage/sunset', <UserOutlined />],
]);

export default function MySiderBar(props: IProps) {
  const [menu, setmenu] = useState<IMenu[]>();
  useEffect(() => {
    getRights().then((result) => {
      setmenu(result.data);
    });
  }, [menu]);
  const navigate = useNavigate();
  const generateList = (menuList: IMenu[]) => {
    return menuList.map((item) =>
      item.children ? (
        <SubMenu key={item.key} icon={<UserOutlined />} title={item.title}>
          {generateList(item.children)}
        </SubMenu>
      ) : (
        <Menu.Item
          key={item.key}
          icon={iconMap.get(item.key)}
          onClick={() => {
            navigate(item.key);
          }}
        >
          {item.title}
        </Menu.Item>
      ),
    );
  };

  return (
    <Sider className="!bg-base" collapsible collapsed={props.collapsed} trigger={null}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        className="rounded-lg"
      >
        {menu && generateList(menu)}
      </Menu>
    </Sider>
  );
}
