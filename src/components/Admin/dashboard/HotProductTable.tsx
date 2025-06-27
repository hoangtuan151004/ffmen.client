"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Eye } from "lucide-react";

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

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

const HotProductTable = () => {
  return (
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
              {productHot.map((p) => (
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
  );
};

export default HotProductTable;
