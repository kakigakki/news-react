import { message, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { editUser, listUsers } from '@/api';
import { TOGGLE_SUCCESS } from '@/constants/message';
import { IUser } from '@/interface';

import { Actions } from './actions';
import UserModal from './UserModal';

export default function RightList() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    dispUsers();
  }, []);

  const dispUsers = async () => {
    const res = await listUsers();
    (res.data as IUser[]).forEach((user) => {
      if (!user.region) {
        user.region = '全球';
      }
      user.roleName = user.role?.roleName;
    });
    setUsers(res.data);
  };

  const handlechangeState = (checked: boolean, item: IUser) => {
    item.roleState = checked;
    setUsers([...users]);
    editUser(item.id!, {
      roleState: checked,
    }).then(() => {
      message.success(TOGGLE_SUCCESS);
    });
  };

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
      width: '25%',
    },
    {
      title: () => <b>用户名</b>,
      dataIndex: 'username',
      width: '25%',
    },
    {
      title: () => <b>用户状态</b>,
      dataIndex: 'roleState',
      width: '15%',
      render: (roleState: boolean, item: IUser) => (
        <Switch
          checked={roleState}
          onChange={(checked) => {
            handlechangeState(checked, item);
          }}
        />
      ),
    },
    {
      title: () => <b>操作</b>,
      key: 'action',
      render: (item: IUser) => (
        <Actions users={users} setUsers={setUsers} dispUsers={dispUsers} item={item} />
      ),
    },
  ];

  return (
    <div>
      <UserModal className="mb-4" dispUsers={dispUsers} isEditMode={false}></UserModal>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
}
