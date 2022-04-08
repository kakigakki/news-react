import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { listRights, listRoles } from '@/api';
import { IRight, IRole } from '@/interface';

import { Actions } from './actions';

export default function RoleList() {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [rights, setRights] = useState<IRight[]>([]);

  useEffect(() => {
    Promise.all([listRoles(), listRights()]).then(([res1, res2]) => {
      setRoles(res1.data);
      setRights(res2.data);
    });
  }, []);

  const columns = [
    {
      title: () => <b>ID</b>,
      dataIndex: 'id',
      width: '15%',
      render: (value: string) => <b>{value}</b>,
    },
    {
      title: () => <b>角色名称</b>,
      dataIndex: 'roleName',
    },
    {
      title: () => <b>操作</b>,
      key: 'action',
      render: (item: IRole) => (
        <Actions rights={rights} roles={roles} setRoles={setRoles} item={item} />
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={roles} pagination={{ hideOnSinglePage: true }} />
  );
}
