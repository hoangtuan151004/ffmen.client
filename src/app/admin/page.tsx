"use client";

import HotProductTable from "../../components/Admin/dashboard/HotProductTable";
import RevenueChart from "../../components/Admin/dashboard/RevenueChart";
import StatCard from "../../components/Admin/dashboard/StatCard";


const DashboardPage = () => {
  const statistics = {
    products: 120,
    categories: 8,
    users: 57,
    revenue: 120000000,
  };

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="space-y-6 p-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Sản phẩm"
          value={statistics.products}
          href="/admin/proadmin"
        />
        <StatCard
          title="Danh mục"
          value={statistics.categories}
          href="/admin/categories"
        />
        <StatCard
          title="Doanh thu"
          value={formatCurrency(statistics.revenue)}
        />
        <StatCard
          title="Người dùng"
          value={statistics.users}
          href="/admin/user"
        />
      </div>
      <RevenueChart />
      <HotProductTable />
    </div>
  );
};

export default DashboardPage;
