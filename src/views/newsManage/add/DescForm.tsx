import { Form, Input, Select } from 'antd';
import React from 'react';
const { Option } = Select;

export default function DescForm() {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form {...layout}>
      <Form.Item name="title" label="新闻标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="category" label="新闻分类" rules={[{ required: true }]}>
        <Select placeholder="Select a option and change input text above" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
    </Form>
  );
}
