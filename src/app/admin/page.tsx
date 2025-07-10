// src/app/admin/dashboard/page.tsx
import { cookies } from "next/headers";
import HotProductTable from "@/components/Admin/dashboard/HotProductTable";
import RevenueChart from "@/components/Admin/dashboard/RevenueChart";
import StatCard from "@/components/Admin/dashboard/StatCard";

export const dynamic = "force-dynamic"; // để không cache trang server

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let revenue = 0;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/revenue/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      revenue = data.totalRevenue || 0;
    }
  } catch (error) {
    console.error("Lỗi khi fetch doanh thu:", error);
  }


const DashboardPage = () => {
  const statistics = {
    products: 120,
    categories: 8,
    users: 57,
    revenue,
  };

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="space-y-6 p-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Sản phẩm" value={statistics.products} href="/admin/proadmin" />
        <StatCard title="Danh mục" value={statistics.categories} href="/admin/categories" />
        <StatCard title="Doanh thu" value={formatCurrency(statistics.revenue)} />
        <StatCard title="Người dùng" value={statistics.users} href="/admin/user" />
      </div>

      <RevenueChart token={token} />
      <HotProductTable />
    </div>
  );
}
