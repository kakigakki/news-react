import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Switch, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import { deleteRight, deleteRightChild, getRights } from '@/api';
import { DELETE_SUCCESS } from '@/constants/message';
import { IRights } from '@/layout/interface';

export default function RightList() {
  const [rights, setRights] = useState<IRights[]>();

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
      render: (item: IRights) => {
        return (
          <div className="flex items-center">
            <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
            <Button
              className=" ml-2"
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteRight(item)}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const handleDeleteRight = (item: IRights) => {
    if (item.grade === 1) {
      setRights(rights?.filter((right) => right.id !== item.id));
      deleteRight(item.id).then(() => {
        message.success(DELETE_SUCCESS);
      });
    } else {
      const parentRight = rights?.filter((right) => right.id === item.rightId)[0];
      if (parentRight) {
        parentRight.children = parentRight.children?.filter(
          (right) => right.id !== item.id,
        );
      }
      setRights([...rights!]);
      deleteRightChild(item.id).then(() => {
        message.success(DELETE_SUCCESS);
      });
    }
  };

  return <Table columns={columns} dataSource={rights} />;
}
