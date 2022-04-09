import { Switch, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import { listUsers } from '@/api';
import { IUser } from '@/interface';

export default function RightList() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    listUsers().then((res) => {
      (res.data as IUser[]).forEach((user) => {
        if (!user.region) {
          user.region = '全球';
        }
        user.roleName = user.role.roleName;
      });
      setUsers(res.data);
    });
  }, []);

  const columns = [
    {
      title: () => <b>区域</b>,
      dataIndex: 'region',
      width: '15%',
      render: (value: string) => <b>{value}</b>,
    },
    {
      title: () => <b>角色名称</b>,
      dataIndex: 'roleName',
      width: '20%',
    },
    {
      title: () => <b>用户名</b>,
      dataIndex: 'username',
      width: '30%',
    },
    {
      title: () => <b>用户状态</b>,
      key: 'action',
      render: () => <Switch />,
    },
    {
      title: () => <b>操作</b>,
      key: 'action',
      // render: (item: IRight) => (
      //   <Actions rights={rights} setRights={setRights} item={item} />
      // ),
    },
  ];

  return (
    <Table columns={columns} dataSource={users} pagination={{ hideOnSinglePage: true }} />
  );
}
