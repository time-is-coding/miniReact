import React, { lazy } from 'react';

// 懒加载页面组件
const Home = lazy(() => import('@/page/Home'));
const Login = lazy(() => import('@/page/Login'));
const NotFind = lazy(() => import('@/page/NotFind'));

// 路由配置，预留权限、icon等字段
interface RouteConfig {
  path: string;
  element: React.ReactNode;
  auth?: boolean;
  icon?: React.ReactNode;
  [key: string]: any;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Home />,
    auth: true,
    icon: null, // 这里可以放icon组件
  },
  {
    path: '/login',
    element: <Login />,
    auth: false,
    icon: null,
},
  {
    path: '/notfound',
    element: <NotFind />,
    auth: false,
    icon: null,
  },
];

export default routes;
