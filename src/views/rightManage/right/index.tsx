import { Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import { getRights } from '@/api';
import { IRights } from '@/interface';

import { Actions } from './actions';

export default function RightList() {
  const [rights, setRights] = useState<IRights[]>([]);

  useEffect(() => {
    getRights().then((res) => {
      (res.data as IRights[]).forEach((item) => {
        if (item.children?.length === 0) {
          item.children = undefined;
        }
      });
      setRights(res.data);
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
      title: () => <b>权限名称</b>,
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: () => <b>权限路径</b>,
      dataIndex: 'key',
      width: '30%',
      render: (value: string) => <Tag color="success">{value}</Tag>,
    },
    {
      title: () => <b>操作</b>,
      key: 'action',
      render: (item: IRights) => (
        <Actions rights={rights} setRights={setRights} item={item} />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={rights}
      pagination={{ hideOnSinglePage: true }}
    />
  );
}
