import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Switch, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import {
  deleteRight,
  deleteRightChild,
  getRights,
  toggleRight,
  toggleRightChild,
} from '@/api';
import { DELETE_COMFIRM, DELETE_SUCCESS, TOGGLE_SUCCESS } from '@/constants/message';
import { IRights } from '@/layout/interface';

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
      render: (item: IRights) => {
        return (
          <div className="flex items-center">
            <Switch
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              checked={item.pagepermisson === 1}
              disabled={item.pagepermisson === undefined}
              onChange={() => handleToggle(item)}
            />
            <Popconfirm
              placement="right"
              title={DELETE_COMFIRM}
              onConfirm={() => handleDeleteRight(item)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                className=" ml-2"
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
              >
                删除
              </Button>
            </Popconfirm>
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
      setRights([...rights]);
      deleteRightChild(item.id).then(() => {
        message.success(DELETE_SUCCESS);
      });
    }
  };

  const handleToggle = (item: IRights) => {
    item.pagepermisson = item.pagepermisson ? 0 : 1;
    if (item.grade === 1) {
      toggleRight(item.id, { pagepermisson: item.pagepermisson }).then(() =>
        message.success(TOGGLE_SUCCESS),
      );
    } else {
      toggleRightChild(item.id, { pagepermisson: item.pagepermisson }).then(() =>
        message.success(TOGGLE_SUCCESS),
      );
    }
    setRights([...rights]);
  };

  return (
    <Table
      columns={columns}
      dataSource={rights}
      pagination={{ hideOnSinglePage: true }}
    />
  );
}
