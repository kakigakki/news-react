import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React from 'react';

import { deleteUser } from '@/api';
import { DELETE_COMFIRM, DELETE_SUCCESS } from '@/constants/message';
import { IUser } from '@/interface';

import UserModal from './UserModal';

interface IActionsProps {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  dispUsers: () => Promise<void>;
  item: IUser;
}

export const Actions = (props: IActionsProps) => {
  const { users, setUsers, item, dispUsers } = props;
  const handleDeleteRight = (item: IUser) => {
    setUsers(users.filter((user) => user.id !== item.id));
    deleteUser(item.id!).then(() => message.success(DELETE_SUCCESS));
  };

  return (
    <div className="flex items-center">
      <UserModal dispUsers={dispUsers} isEditMode={true} user={item}></UserModal>
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
