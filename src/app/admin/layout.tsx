// import { cookies } from "next/headers";
import AdminLayout from "@/components/Admin/AdminLayout";

export default async function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {

  // 🚨 Không decode hay kiểm tra role ở đây nữa!
  return <AdminLayout>{children}</AdminLayout>;
}
