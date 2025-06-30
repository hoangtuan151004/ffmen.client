import { cookies } from "next/headers";
import AdminLayout from "@/components/Admin/AdminLayout";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value || null;
  return <AdminLayout token={token}>{children}</AdminLayout>;
}
