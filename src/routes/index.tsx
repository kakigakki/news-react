import React from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';

import Layout from '@/layout';
import { LazyLoad } from '@/routes/LazyLoad';

export default function MyRoute() {
  const location = useLocation();
  const token = !!localStorage.getItem('token');
  const element = useRoutes([
    {
      path: '/',
      element: token ? (
        <Layout></Layout>
      ) : (
        <Navigate to="/login" state={{ redirect: location.pathname }} />
      ),
      children: [
        {
          path: '',
          element: <Navigate to="/home" />,
        },
        {
          path: 'home',
          element: LazyLoad('home'),
        },
        {
          path: 'user-manage/list',
          element: LazyLoad('userManage'),
        },
        {
          path: 'right-manage/role/list',
          element: LazyLoad('rightManage/role'),
        },
        {
          path: 'right-manage/right/list',
          element: LazyLoad('rightManage/right'),
        },
        {
          path: 'news-manage/add',
          element: LazyLoad('newsManage/add'),
        },
        {
          path: 'news-manage/draft',
          element: LazyLoad('newsManage/draft'),
        },
        {
          path: 'news-manage/category',
          element: LazyLoad('newsManage/category'),
        },
        {
          path: 'audit-manage/audit',
          element: LazyLoad('auditmanage/audit'),
        },
        {
          path: 'audit-manage/list',
          element: LazyLoad('auditmanage/list'),
        },
        {
          path: 'publish-manage/unpublished',
          element: LazyLoad('publishManage/unpublished'),
        },
        {
          path: 'publish-manage/published',
          element: LazyLoad('publishManage/published'),
        },
        {
          path: 'publish-manage/sunset',
          element: LazyLoad('publishManage/sunset'),
        },
      ],
    },
    {
      path: '/login',
      element: LazyLoad('login'),
    },
    {
      path: '/news',
      element: LazyLoad('news'),
    },
    {
      path: '*',
      element: LazyLoad('404'),
    },
  ]);

  return element;
}
