import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Button, message, Modal, Popconfirm } from 'antd';
import React, { useState } from 'react';

import { deleteUser } from '@/api';
import { DELETE_COMFIRM, DELETE_SUCCESS } from '@/constants/message';
import { IUser } from '@/interface';

interface IActionsProps {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  item: IUser;
}

export const Actions = (props: IActionsProps) => {
  const { users, setUsers, item } = props;

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDeleteRight = (item: IUser) => {
    setUsers(users.filter((user) => user.id !== item.id));
    deleteUser(item.id).then(() => message.success(DELETE_SUCCESS));
  };

  const handleModalOk = () => {};

  return (
    <div className="flex items-center">
      <Button
        size="small"
        icon={<FormOutlined />}
        type="primary"
        onClick={() => setVisible(true)}
      >
        修改
      </Button>
      <Modal
        width={300}
        bodyStyle={{ display: 'flex', justifyContent: 'center' }}
        title="用户修改"
        visible={visible}
        onOk={handleModalOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      ></Modal>
      <Popconfirm
        placement="right"
        title={DELETE_COMFIRM}
        onConfirm={() => handleDeleteRight(item)}
        okText="Yes"
        cancelText="No"
        overlayInnerStyle={{ borderRadius: '10px' }}
      >
        <Button
          className="ml-2"
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
};
