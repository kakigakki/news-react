import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Switch } from 'antd';
import React from 'react';

import { deleteRight, deleteRightChild, toggleRight, toggleRightChild } from '@/api';
import { DELETE_COMFIRM, DELETE_SUCCESS, TOGGLE_SUCCESS } from '@/constants/message';
import { IRight } from '@/interface';

interface IActionsProps {
  rights: IRight[];
  setRights: React.Dispatch<React.SetStateAction<IRight[]>>;
  item: IRight;
}

export const Actions = (props: IActionsProps) => {
  const { rights, setRights, item } = props;
  const handleDeleteRight = (item: IRight) => {
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

  const handleToggle = (item: IRight) => {
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
        overlayInnerStyle={{ borderRadius: '10px' }}
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
};
