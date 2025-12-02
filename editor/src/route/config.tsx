import React, { lazy } from "react";

// 懒加载页面组件
const Home = lazy(() => import("@/page/Home"));
const Login = lazy(() => import("@/page/Login"));
const UploadPage = lazy(() => import("@/page/Home/UploadPage"));
const EditorPage = lazy(() => import("@/page/Home/EditorPage"));
const Test = lazy(() => import("@/page/Test"));
const NotFind = lazy(() => import("@/page/NotFind"));

// 路由配置，预留权限、icon等字段
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  auth?: boolean;
  icon?: React.ReactNode;
  title?: string;
  children?: RouteConfig[];
  [key: string]: any;
}

const routes: RouteConfig[] = [
  {
    title: "首页",
    path: "/",
    element: <Home />,
    auth: true,
    icon: null, // 这里可以放icon组件
    children: [
      {
        title: "大文件上传",
        path: "/upload",
        element: <UploadPage />,
        auth: true,
        icon: null,
      },
      {
        title: "富文本编辑器",
        path: "/editor",
        element: <EditorPage />,
        auth: true,
        icon: null,
      },
    ],
  },
  {
    title: "富文本编辑器",
    path: "/login",
    element: <Login />,
    auth: false,
    icon: null,
  },
  // {
  //   title: "test",
  //   path: "/test",
  //   element: <Test />,
  //   auth: false,
  //   icon: null,
  // },
  {
    title: "404",
    path: "/notfound",
    element: <NotFind />,
    auth: false,
    icon: null,
  },
];

export default routes;
