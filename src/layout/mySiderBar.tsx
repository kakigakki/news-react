/* eslint-disable react/jsx-key */
import {
  DatabaseOutlined,
  EditOutlined,
  ExceptionOutlined,
  EyeOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  HomeOutlined,
  InboxOutlined,
  KeyOutlined,
  LockOutlined,
  ReadOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { listRights } from '@/api';

import { IRight } from '../interface';
const { SubMenu } = Menu;
const { Sider } = Layout;

interface MySiderBarProps {
  collapsed: boolean;
}

const iconMap = new Map([
  ['/home', <HomeOutlined />],
  ['/user-manage', <UserOutlined />],
  ['/user-manage/list', <TeamOutlined />],
  ['/right-manage', <LockOutlined />],
  ['/right-manage/role/list', <TeamOutlined />],
  ['/right-manage/right/list', <KeyOutlined />],
  ['/news-manage', <ReadOutlined />],
  ['/news-manage/add', <ReadOutlined />],
  ['/news-manage/draft', <InboxOutlined />],
  ['/news-manage/category', <DatabaseOutlined />],
  ['/audit-manage', <EyeOutlined />],
  ['/audit-manage/audit', <FileSearchOutlined />],
  ['/audit-manage/list', <UnorderedListOutlined />],
  ['/publish-manage', <EditOutlined />],
  ['/publish-manage/unpublished', <ExceptionOutlined />],
  ['/publish-manage/published', <FileDoneOutlined />],
  ['/publish-manage/sunset', <FileTextOutlined />],
]);

export default function MySiderBar(props: MySiderBarProps) {
  const [menu, setMenu] = useState<IRight[]>();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    listRights().then((result) => {
      setMenu(result.data);
    });
  }, []);

  const selectedKeys = [location.pathname];
  const generateList = (menuList: IRight[]) => {
    return menuList
      .filter((item) => item.pagepermisson === 1)
      .map((item) =>
        item.children && item.children.length > 0 ? (
          <SubMenu key={item.key} icon={iconMap.get(item.key)} title={item.title}>
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
        className="rounded-lg select-none"
        selectedKeys={selectedKeys}
        defaultOpenKeys={selectedKeys.map((k) => '/' + k.split('/')[1])}
      >
        {menu && generateList(menu)}
      </Menu>
    </Sider>
  );
}
