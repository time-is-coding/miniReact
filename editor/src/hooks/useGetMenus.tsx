import routes from "@/route/config";
import type { RouteConfig } from "@/route/config";
import type { MenuProps } from "antd";

/**
 * 检查路由是否适合显示在菜单中
 * @param route 路由配置
 * @returns 是否适合显示在菜单中
 */
export const isRouteValidForMenu = (route: RouteConfig): boolean => {
  // 排除一些特殊页面，如登录页、404页
  const excludedPaths = ["/login", "/notfound"];

  // 检查路径是否被排除
  if (excludedPaths.includes(route.path)) {
    return false;
  }

  // 确保有路径
  return !!route.path;
};

/**
 * 从路由配置中提取标题
 * @param routeConfig 路由配置
 * @returns 标题字符串
 */
const extractTitleFromRoute = (routeConfig: RouteConfig): string => {
  // 优先使用显式设置的title
  if (routeConfig.title) {
    return routeConfig.title;
  }

  // 从path中提取标题
  const pathParts = routeConfig.path.split("/").filter(Boolean);
  if (pathParts.length > 0) {
    // 将路径最后一部分转换为标题格式（首字母大写）
    return pathParts[pathParts.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // 默认标题
  return "Home";
};

/**
 * 生成唯一键值
 * @returns 唯一键字符串
 */
const generateUniqueKey = (): string => {
  return `menu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 将路由配置转换为antd5 Menu组件所需的菜单项
 * @param routeConfig 路由配置
 * @returns antd5 Menu组件菜单项
 */
const transformToMenuItem = (routeConfig: RouteConfig) => {
  // 从路由路径或组件名称中提取标题
  const label = extractTitleFromRoute(routeConfig);

  const menuItem: any = {
    key: routeConfig.path || generateUniqueKey(),
    label,
    icon: routeConfig.icon,
    path: routeConfig.path,
    auth: routeConfig.auth !== false, // 默认需要认证
  };

  // 处理子路由
  if (routeConfig.children && Array.isArray(routeConfig.children)) {
    const validChildren = routeConfig.children
      .filter((childRoute) => isRouteValidForMenu(childRoute))
      .map((childRoute) => transformToMenuItem(childRoute));

    if (validChildren.length > 0) {
      menuItem.children = validChildren;
    }
  }

  return menuItem;
};

/**
 * 菜单生成Hook
 * 从路由配置中提取适合作为antd5 Menu组件显示的数据
 * @returns 格式化后的菜单数据，符合antd5 Menu组件要求
 */
const useGetMenus = (): MenuProps["items"] => {
  // 处理顶层路由
  const menuItems = routes
    .filter((route) => isRouteValidForMenu(route))
    .map((route) => transformToMenuItem(route));

  return menuItems;
};

/**
 * 获取第一个有效的路由路径，用于默认跳转
 * @returns 第一个有效的路由路径
 */
export const getFirstValidRoutePath = (): string => {
  // 首先检查是否有顶级路由（不包含children的路由）
  for (const route of routes) {
    if (isRouteValidForMenu(route) && !route.children) {
      return route.path;
    }
  }

  // 如果没有顶级路由，检查第一个有children的路由的第一个子路由
  for (const route of routes) {
    if (route.children && Array.isArray(route.children)) {
      for (const childRoute of route.children) {
        if (isRouteValidForMenu(childRoute)) {
          return childRoute.path;
        }
      }
    }
  }

  // 默认返回首页
  return "/";
};

export default useGetMenus;
