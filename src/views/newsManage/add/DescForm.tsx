import { Form, FormInstance, Input, Select } from 'antd';
import React, { forwardRef, Ref } from 'react';
const { Option } = Select;

interface DescFormProps {
  className: string;
}

const DescForm = forwardRef(
  (props: DescFormProps, ref: Ref<FormInstance<any>> | undefined) => {
    const layout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 16, offset: 1 },
    };
    return (
      <Form {...layout} ref={ref} requiredMark={false} className={props.className}>
        <Form.Item name="title" label="新闻标题" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="新闻分类" rules={[{ required: true }]}>
          <Select>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
      </Form>
    );
  },
);

DescForm.displayName = 'DescForm';

export default DescForm;
