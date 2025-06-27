"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = () => {
  const statistics = {
    products: 120,
    categories: 8,
    users: 57,
    revenue: 120000000,
  };

  const productHot = [
    {
      id: "1",
      name: "Áo sơ mi trắng",
      price: 290000,
      img: "/images/shirt.jpg",
      description: "Áo sơ mi trắng form rộng",
      view: 238,
    },
    {
      id: "2",
      name: "Quần jean rách",
      price: 350000,
      img: "/images/jean.jpg",
      description: "Quần jean rách gối cá tính",
      view: 156,
    },
  ];

  const revenueData = [
    { month: "Th1", revenue: 12000000 },
    { month: "Th2", revenue: 18000000 },
    { month: "Th3", revenue: 9500000 },
    { month: "Th4", revenue: 22000000 },
    { month: "Th5", revenue: 15000000 },
    { month: "Th6", revenue: 18000000 },
  ];

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="space-y-6 p-6 w-full">
      {/* Thống kê tổng quan */}
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

      {/* Biểu đồ doanh thu */}
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ doanh thu (6 tháng gần nhất)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sản phẩm hot */}
      <Card>
        <CardHeader>
          <CardTitle>Sản phẩm hot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-600">
                  <th className="px-4 py-2 text-left">Tên</th>
                  <th className="px-4 py-2 text-left">Giá</th>
                  <th className="px-4 py-2 text-left">Hình ảnh</th>
                  <th className="px-4 py-2 text-left">Mô tả</th>
                  <th className="px-4 py-2 text-left">Lượt xem</th>
                </tr>
              </thead>
              <tbody>
                {productHot.map((p, idx) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-2">
                      <Image
                        src={p.img}
                        alt={p.name}
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {p.description.length > 40
                        ? p.description.slice(0, 40) + "..."
                        : p.description}
                    </td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <Eye size={16} className="text-gray-500" />
                      {p.view}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;

const StatCard = ({
  title,
  value,
  href,
}: {
  title: string;
  value: number | string;
  href?: string;
}) => {
  const content = (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
      </CardContent>
    </Card>
  );
  return href ? <Link href={href}>{content}</Link> : content;
};
