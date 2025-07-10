// import { cookies } from "next/headers";
import AdminLayout from "@/components/Admin/AdminLayout";
import { getCookies } from "@/lib/getToken";

export default async function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await getCookies()) || "";    
  return <AdminLayout token={token}>{children}</AdminLayout>;

}
