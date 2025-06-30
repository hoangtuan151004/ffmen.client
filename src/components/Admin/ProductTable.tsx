"use client";

import * as React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductDetailPopup from "./ProductDetailPopup"; // 👈 đảm bảo đúng path nha

interface Product {
  _id: string;
  imgs: { url: string }[];
  name: string;
  quantity: number;
  price: number;
  discountPrice: number;
  category?: { name: string };
  shortDescription: string;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  formatCurrency,
}) => {
  const [showDetail, setShowDetail] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  return (
    <div className="rounded-md border w-full overflow-x-auto">
      <Table className="w-full min-w-[900px] text-left table-fixed border-collapse border border-gray-200">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="text-center w-[40px]">STT</TableHead>
            <TableHead className="text-center">Hình ảnh</TableHead>
            <TableHead className="text-center">Tên</TableHead>
            <TableHead className="text-center">SL</TableHead>
            <TableHead className="text-center">Giá</TableHead>
            <TableHead className="text-center">Giảm</TableHead>
            <TableHead className="text-center hidden sm:table-cell">
              Danh mục
            </TableHead>
            <TableHead className="text-center hidden sm:table-cell">
              Mô tả
            </TableHead>
            <TableHead className="text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <TableRow key={product._id} className="hover:bg-gray-50">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="flex justify-center items-center py-2">
                  <img
                    src={product.imgs[0]?.url}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-center">{product.name}</TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(product.discountPrice)}
                </TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  {product.category?.name || "Không có"}
                </TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  {product.shortDescription.length > 20
                    ? `${product.shortDescription.slice(0, 20)}...`
                    : product.shortDescription}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetail(product)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <Eye size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-gray-500 py-4">
                Không có sản phẩm nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
