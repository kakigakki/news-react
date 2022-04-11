import { FormOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Drawer,
  Form,
  FormInstance,
  Input,
  message,
  Row,
  Select,
  Space,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { addUser, editUser, listRegions, listRoles } from '@/api';
import { ADD_SUCCESS, EDIT_SUCCESS } from '@/constants/message';
import { ERole, IRegion, IRole, IUser } from '@/interface';

interface IUserModalProps {
  className?: string;
  dispUsers: () => Promise<void>;
  isEditMode: boolean;
  user?: IUser;
}
export default function UserModal(props: IUserModalProps) {
  const { className, dispUsers, isEditMode, user } = props;

  const [visible, setVisible] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [regionDisabled, setRegionDisable] = useState(false);

  const formRef = useRef<FormInstance>(null);

  useEffect(() => {
    listRoles().then((res) => {
      setRoles(res.data);
    });
  }, []);

  useEffect(() => {
    listRegions().then((res) => {
      setRegions(res.data);
    });
  }, []);

  const handleShowAddDrawer = () => {
    setVisible(true);
  };

  const handleShowEditDrawer = () => {
    if (!user?.id) {
      return;
    }
    setVisible(true);
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        name: user.username,
        password: user.password,
        region: user.region,
        role: user.roleId,
      });
      handleControlRegion(user.roleId);
    }, 0);
  };

  const handleCloseDrawer = () => {
    formRef.current?.resetFields();
    setVisible(false);
  };

  const handleAddUser = async () => {
    try {
      await formRef.current?.validateFields();
      const values = formRef.current?.getFieldsValue();
      await addUser({
        username: values.name,
        password: values.password,
        region: values.region ?? '',
        roleId: values.role,
        roleState: true,
        default: true,
      });
      await dispUsers();
      message.success(ADD_SUCCESS);
      handleCloseDrawer();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditUser = async () => {
    if (!user?.id) {
      return;
    }
    try {
      await formRef.current?.validateFields();
      const values = formRef.current?.getFieldsValue();
      await editUser(user.id, {
        username: values.name,
        password: values.password,
        region: values.region ?? '',
        roleId: values.role,
        roleState: true,
        default: true,
      });
      await dispUsers();
      message.success(EDIT_SUCCESS);
      handleCloseDrawer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleControlRegion = (roleId: number) => {
    if (roleId === ERole.SUPER_ADMIN) {
      setRegionDisable(true);
      formRef.current?.setFieldsValue({
        region: '',
      });
    } else {
      setRegionDisable(false);
    }
  };

  const mode = isEditMode
    ? {
        openButton: (
          <Button
            size="small"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleShowEditDrawer}
          >
            修改
          </Button>
        ),
        drawerPlacement: 'right' as any,
        drawerTitle: '修改用户',
        submitButton: (
          <Button onClick={handleEditUser} type="primary">
            修改
          </Button>
        ),
      }
    : {
        openButton: (
          <Button
            size="large"
            type="dashed"
            icon={<FormOutlined />}
            onClick={handleShowAddDrawer}
          >
            添加用户
          </Button>
        ),
        drawerPlacement: 'left' as any,
        drawerTitle: '新增用户',
        submitButton: (
          <Button onClick={handleAddUser} type="primary">
            创建
          </Button>
        ),
      };

  return (
    <div className={className}>
      {mode.openButton}
      <Drawer
        placement={mode.drawerPlacement}
        title={mode.drawerTitle}
        width={600}
        onClose={handleCloseDrawer}
        visible={visible}
        extra={
          <Space>
            <Button onClick={handleCloseDrawer}>取消</Button>
            {mode.submitButton}
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark ref={formRef}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="用户名"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: 'Please enter password' }]}
              >
                <Input.Password placeholder="Please enter password" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="region"
                label="区域"
                rules={[{ required: !regionDisabled, message: 'Please select a region' }]}
              >
                <Select
                  placeholder="Please select a region"
                  allowClear
                  disabled={regionDisabled}
                >
                  {regions?.map((region) => (
                    <Select.Option value={region.value} key={region.value}>
                      {region.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="角色"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select placeholder="Please select a role" onChange={handleControlRegion}>
                  {roles?.map((role) => (
                    <Select.Option value={role.id} key={role.id}>
                      {role.roleName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}
