export const generateBreadcrumb = (pathname: string) => {
  const pathWithoutQuery = pathname.split("?")[0];
  const segments = pathWithoutQuery.split("/").filter(Boolean);

  const labelMap: Record<string, string> = {
    admin: "Dashboard",
    products: "Sản phẩm",
    categories: "Danh mục",
    users: "Người dùng",
    orders: "Đơn hàng",
    dashboard: "Thống kê",
    proadmin: "Quản lý sản phẩm",
    // add thêm nếu muốn custom
  };

  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const name =
      labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    return { name, href, isLast: index === segments.length - 1 };
  });

  return breadcrumbItems;
};
