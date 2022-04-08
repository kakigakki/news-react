import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Button, message, Modal, Popconfirm, Tree } from 'antd';
import React, { Key, useState } from 'react';

import { changeRoleRight, deleteRole } from '@/api';
import { DELETE_COMFIRM, DELETE_SUCCESS, EDIT_SUCCESS } from '@/constants/message';
import { ERole, IRight, IRole } from '@/interface';

interface IActionsProps {
  rights: IRight[];
  roles: IRole[];
  setRoles: React.Dispatch<React.SetStateAction<IRole[]>>;
  item: IRole;
}

export const Actions = (props: IActionsProps) => {
  const { rights, roles, setRoles, item } = props;

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [treeCheckedKeys, setTreeCheckedKeys] = useState<Key[]>(item.rights);

  const handleDeleteRight = (item: IRole) => {
    setRoles(roles.filter((role) => role.id !== item.id));
    deleteRole(item.id).then(() => {
      message.success(DELETE_SUCCESS);
    });
  };
  const handleModalOk = () => {
    setConfirmLoading(true);
    changeRoleRight(item.id, {
      rights: treeCheckedKeys,
    }).then(() => {
      setVisible(false);
      setConfirmLoading(false);
      message.success(EDIT_SUCCESS);
    });
  };

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
        title="权限修改"
        visible={visible}
        onOk={handleModalOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Tree
          checkable
          showLine
          onCheck={(checked) => setTreeCheckedKeys(checked as Key[])}
          checkedKeys={treeCheckedKeys}
          treeData={rights}
        />
      </Modal>
      <Popconfirm
        placement="right"
        title={DELETE_COMFIRM}
        onConfirm={() => handleDeleteRight(item)}
        okText="Yes"
        cancelText="No"
        overlayInnerStyle={{ borderRadius: '10px' }}
        disabled={item.roleType === ERole.SUPER_ADMIN}
      >
        <Button
          className="ml-2"
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
          disabled={item.roleType === ERole.SUPER_ADMIN}
        >
          删除
        </Button>
      </Popconfirm>
    </div>
  );
};
