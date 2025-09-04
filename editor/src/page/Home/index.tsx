import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Menu } from "antd";
import useGetMenus, { getFirstValidRoutePath } from "@/hooks/useGetMenus";
import styles from "./style.module.less";

const Home = () => {
  const navigate = useNavigate();
  const menuItems = useGetMenus();
  const location = useLocation();

  // 实现默认跳转到第一个路由的功能
  useEffect(() => {
    const firstRoutePath = getFirstValidRoutePath();
    if (location.pathname === "/" && firstRoutePath && firstRoutePath !== "/") {
      navigate(firstRoutePath);
    }
  }, [navigate]);

  // 处理菜单项点击事件
  const handleMenuClick = (e: any) => {
    const path = e.key;
    if (path) {
      // 确保使用正确的路径进行导航
      navigate(path);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.menuBox}>
        <Menu
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
          className={styles.menu}
          selectedKeys={[location.pathname]}
        />
      </div>
      <div className={styles.contentBox}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
