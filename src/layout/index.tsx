import { Layout } from 'antd';
import React, { useState } from 'react';

const { Content } = Layout;
import {} from '@ant-design/icons';

import MyContent from './myContent';
import MyFooter from './myFooter';
import MyHeader from './myHeader';
import MySiderBar from './mySiderBar';

export default function index() {
  const [collapsed, setcollapsed] = useState(false);

  return (
    <Layout className="!min-h-screen text-lg ">
      <Content className="flex flex-col px-5">
        <MyHeader collapsed={collapsed} setcollapsed={setcollapsed} />
        <Layout>
          <MySiderBar collapsed={collapsed} />
          <MyContent />
        </Layout>
      </Content>
      <MyFooter />
    </Layout>
  );
}
