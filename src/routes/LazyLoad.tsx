
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const antIcon = <LoadingOutlined className='text-lg' spin />;

export const LazyLoad = (path:string) => {

  const Comp = React.lazy(() => import( /* @vite-ignore */ `../views/${path}`))
  return (
      <React.Suspense fallback={<Spin indicator={antIcon}></Spin>}>
          <Comp />
      </React.Suspense>
  )
}