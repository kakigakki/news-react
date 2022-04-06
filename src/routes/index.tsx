import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Layout from '@/layout';
import { LazyLoad } from '@/routes/LazyLoad';

export default function MyRoute() {
  const element = useRoutes([
    {
      path: '/',
      element: <Layout></Layout>,
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
          path: 'user-manager',
          element: LazyLoad('userManager'),
        },
        {
          path: 'right-manager/role',
          element: LazyLoad('rightManager'),
        },
        {
          path: 'right-manager/right/list',
          element: LazyLoad('rightManager'),
        },
        {
          path: 'news-manager/draft',
          element: LazyLoad('newsManager/draft'),
        },
        {
          path: 'news-manager/category',
          element: LazyLoad('newsManager/category'),
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
