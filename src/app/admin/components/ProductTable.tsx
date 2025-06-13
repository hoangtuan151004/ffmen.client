import React from "react";
import Link from "next/link";

const ProductTable = ({ products, onDelete, formatCurrency }) => {
  return (
    <div className="table-responsive overflow-auto rounded-md">
      <table className="w-full text-left table-fixed border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              STT
            </th>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              Hình ảnh
            </th>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              Tên
            </th>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              Số lượng
            </th>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              Giá
            </th>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              Giá giảm
            </th>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              Danh mục
            </th>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              Mô tả
            </th>
            <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className="even:bg-gray-50 hover:bg-gray-100 transition duration-200"
            >
              <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                {index + 1}
              </td>
              <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                <img
                  loading="lazy"
                  src={product.imgs[0]?.url}
                  alt={product.name}
                  className="w-14 h-14 object-cover"
                />
              </td>
              <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                {product.name}
              </td>
              <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                {product.quantity}
              </td>
              <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                {formatCurrency(product.price)}
              </td>
              <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                {formatCurrency(product.price2)}
              </td>
              <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                {product.category.categoryName}
              </td>
              <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                {product.shortDescription.length > 100
                  ? product.shortDescription.substring(0, 100) + "..."
                  : product.shortDescription}
              </td>
              <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                <Link href={`/admin/proadmin/update/${product._id}`}>
                  <button className="text-blue-500 hover:text-blue-700">
                    Sửa
                  </button>
                </Link>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => onDelete(product._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="py-3 px-4 border border-gray-300 text-center text-sm text-gray-500"
              >
                Không có sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
