import React, { useState, Suspense } from "react";
import {
  Outlet,
  useNavigate,
  NonIndexRouteObject,
  useLocation,
} from "react-router-dom";
import { Card, MenuProps } from "antd";
import { Layout, Menu, theme, Spin } from "antd";
import HeaderComp from "./components/Header";
import { routes } from "@/router/index";

// 定义路由对象的类型，包括标题和图标
type RouteType = NonIndexRouteObject & {
  title: string;
  icon: React.ReactElement;
};

// 从antd Layout 中解构组件
const { Header, Content, Footer, Sider } = Layout;

// 定义 BasicLayout 函数组件
const BasicLayout: React.FC = () => {
  // 管理Sider的展开/折叠状态的状态
  const [collapsed, setCollapsed] = useState(false);
  // 获取当前位置和导航函数
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 从主题中获取容器背景颜色
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 递归生成菜单项的函数
  const getItems: any = (children: RouteType[]) => {
    return children.map((item) => {
      return {
        key: item.index
          ? "/"
          : item.path?.startsWith("/")
            ? item.path
            : `/${item.path}`,
        icon: item.icon,
        label: item.title,
        children: item.children ? getItems(item.children) : null,
      };
    });
  };

  // 从路由配置生成菜单项
  const menuItems: MenuProps["items"] = getItems(
    routes[0].children!.filter((item) => item.path !== "*")
  );

  // 处理菜单项点击事件以导航到相应的路由
  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  // 根据当前路径渲染展开的菜单项
  const renderOpenKeys = () => {
    const arr = pathname.split("/").slice(0, -1);
    const result = arr.map(
      (_, index) => "/" + arr.slice(1, index + 1).join("/")
    );
    return result;
  };

  // // 初始面包屑项，默认为首页
  // const breadcrumbItems = [
  //   {
  //     title: (
  //       <>
  //         <HomeOutlined />
  //         <span style={{ marginLeft: "10px" }}>Home</span>
  //       </>
  //     ),
  //     href: "/",
  //   },
  // ];
  // // 管理面包屑项的动态状态
  // const [secondBreadcrumb, setSecondBreadcrumb] = useState(breadcrumbItems);

  // // 根据当前位置更新面包屑项
  // useEffect(() => {
  //   const path = location;
  //   const { children } = routes.find((item) => item.name === "menuRoutes") ?? {};
  //   const arr = setBreadcrumbItems(children!, path);
  //   setSecondBreadcrumb(arr!);
  // }, [location]);


  // 渲染主要布局结构
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sider组件 */}
      <Sider
        breakpoint="lg"
        theme="light"
        style={{
          overflow: "auto",
          maxHeight: "94vh"
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* Logo和导航链接到首页 */}
        <div
          style={{
            display: "flex",
            justifyContent: 'center',
            height: 40,
            margin: 16,
          }}
        ></div>
        {/* 主导航菜单 */}
        <Menu
          theme="light"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={renderOpenKeys()}
          mode="inline"
          items={menuItems}
          onClick={onMenuClick}
        />
      </Sider>
      {/* Layout容器 */}
      <Layout className="site-layout">
        {/* Header组件，设置样式 */}
        <Header style={{ padding: "0 10px", background: colorBgContainer }}>
          <HeaderComp />
        </Header>
        {/* 内容区域，包含面包屑和路由出口 */}
        <Content
          style={{
            padding: 16,
            overflow: "auto",
            height: `calc(100vh - 128px)`,
          }}
        >
          {/* 用于代码分割和加载中显示的Suspense */}
          <Suspense fallback={<Spin size="large" className="content_spin" />}>
            {/* 面包屑组件和路由出口 */}
            {
              pathname === '/' ? <>
                <div style={{ marginBottom: '44px', marginTop: '20px', fontSize: '20px', color: 'rgb(33,84,118)' }}>元构件首页</div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Card
                    hoverable
                    title="知识元" bordered={false} style={{ width: 460, cursor: 'pointer' }}>
                    <p>成本优先</p>
                    <p>服务优先</p>
                    <p>质量优先</p>
                    <p>效率优先</p>
                  </Card>
                  <Card title="决策元"
                    hoverable
                    bordered={false} style={{ width: 460, cursor: 'pointer' }}>
                    <p>生产链</p>
                    <p>销售链</p>
                    <p>资金链</p>
                    <p>人力链</p>
                    <p>物流链</p>
                  </Card>
                  <Card title="数据元"
                    hoverable
                    bordered={false} style={{ width: 460, cursor: 'pointer' }}>
                    <p>数据管理</p>
                    <p>数据感知</p>
                    <p>数据融合</p>
                  </Card>
                </div>
              </> : <></>
            }
            <Outlet />
          </Suspense>
        </Content>
        {/* 底部区域 */}
        <Footer style={{ textAlign: "center" }}>
        </Footer>
      </Layout>
    </Layout>
  );
};

// 将BasicLayout组件作为默认导出
export default BasicLayout;
