import { HomeOutlined } from "@ant-design/icons";
import { setBreadcrumbItemsFnType } from "@/types/breadcrumbs";

export const setBreadcrumbItems: setBreadcrumbItemsFnType = (
  array = [],
  locationPath,
) => {
  const arr = [
    {
      title: (
        <>
          <HomeOutlined />
          <span style={{ marginLeft: "10px" }}>Home</span>
        </>
      ),
      href: "/",
    },
  ];
  const locationPathLength = locationPath.pathname.split("/").length;

  // 判断是否是一级路由
  if (locationPathLength === 2) {
    const { path, title } = array.find((item) => item.path === locationPath.pathname) || {};
    if (title) {
      arr.push({
        title: <span>{title}</span>,
        href: path!,
      });
    }
    return arr;
  } else if (locationPathLength > 2) {
    const travel = (travelArr: any[]) => {
      const { children, path, title } =
        travelArr.find((item: { path: string; }) => {
          return item.path.split("/")[1] === locationPath.pathname.split("/")[1];
        }) || {};
      arr.push({
        title: <span>{title}</span>,
        href: path as string
      });
      if (children && children.length > 0) {
        travel(children);
      }
    }
    travel(array);
    return arr;
  }
};
