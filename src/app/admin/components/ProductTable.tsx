import React, { useState } from "react";
import ProductDetailPopup from "./ProductDetailPopup"; // 👈 nhớ đúng path nhé
import { Pencil, Trash2, Eye } from "lucide-react";
const ProductTable = ({ products, onEdit, onDelete, formatCurrency }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  return (
    <div className="table-responsive overflow-auto rounded-md">
      <table className="w-full text-left table-fixed border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
              STT
            </th>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
              Hình ảnh
            </th>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
              Tên
            </th>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
              Số lượng
            </th>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
              Giá
            </th>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
              Giá giảm
            </th>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
              Danh mục
            </th>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
              Mô tả
            </th>
            <th className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
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
              <td className="py-[2px] px-2 border text-center border-gray-300 text-sm text-gray-600">
                {index + 1}
              </td>
              <td className="py-[2px] px-2 border border-gray-300 text-sm font-medium text-gray-700 flex items-center justify-center">
                <img
                  loading="lazy"
                  src={product.imgs[0]?.url}
                  alt={product.name}
                  className="w-14 h-14 object-cover"
                />
              </td>

              <td className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
                {product.name}
              </td>
              <td className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
                {product.quantity}
              </td>
              <td className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
                {formatCurrency(product.price)}
              </td>
              <td className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
                {formatCurrency(product.discountPrice)}
              </td>
              <td className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
                {product.category?.name || "Không có danh mục"}
              </td>
              <td className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
                {product.shortDescription.length > 100
                  ? product.shortDescription.substring(0, 100) + "..."
                  : product.shortDescription}
              </td>
              <td className="py-[2px] px-2 border text-center border-gray-300 text-sm font-medium text-gray-700">
                <div className="flex justify-center items-center gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    title="Sửa"
                    onClick={() => onEdit(product._id)}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="text-red-500 hover:text-red-700"
                    title="Xoá"
                    onClick={() => onDelete(product._id)}
                  >
                    <Trash2 size={18} />
                  </button>

                  <button
                    className="text-green-500 hover:text-green-700"
                    title="Xem chi tiết"
                    onClick={() => handleViewDetail(product)}
                  >
                    <Eye size={18} />
                  </button>
                </div>
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

      {/* 👇 Popup chi tiết sản phẩm */}
      {showDetail && selectedProduct && (
        <ProductDetailPopup
          show={showDetail}
          onClose={() => setShowDetail(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductTable;
