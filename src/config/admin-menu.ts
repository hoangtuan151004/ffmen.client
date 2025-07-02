import {
  LayoutDashboard,
  User,
  Tag,
  ShoppingCart,
  Package,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: User,
  },
  {
    title: "Danh mục",
    url: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Sản phẩm",
    url: "/admin/proadmin",
    icon: ShoppingCart,
  },
  {
    title: "Đơn hàng",
    url: "/admin/orders",
    icon: Package,
  },
];
