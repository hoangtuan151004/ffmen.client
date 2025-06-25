import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ProductDetailPopupProps {
  product: any;
  show: boolean;
  onClose: () => void;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-gray-500 font-medium">{label}:</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

const DescriptionBlock = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="mt-6">
    <p className="text-sm font-semibold text-gray-800 mb-1">{label}:</p>
    <p className="text-gray-700 whitespace-pre-line">{value}</p>
  </div>
);

const ProductDetailPopup: React.FC<ProductDetailPopupProps> = ({
  product,
  show,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center"
          onClick={onClose}
        >
          <motion.div
            key="popup"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl w-full max-w-5xl p-6 shadow-lg overflow-y-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                🛍️ Chi tiết sản phẩm
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Tên sản phẩm" value={product.name} />
              <InfoRow
                label="Giá"
                value={product.price.toLocaleString() + " đ"}
              />
              <InfoRow
                label="Giá khuyến mãi"
                value={product.discountPrice.toLocaleString() + " đ"}
              />
              <InfoRow label="Danh mục" value={product.category?.name} />
              <InfoRow label="Số lượng" value={product.quantity} />
              <InfoRow
                label="Trạng thái hiển thị"
                value={product.isVisible ? "✅ Hiển thị" : "❌ Ẩn"}
              />
            </div>

            <DescriptionBlock
              label="📄 Mô tả ngắn"
              value={product.shortDescription}
            />
            <DescriptionBlock
              label="📜 Mô tả chi tiết"
              value={product.longDescription}
            />

            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                🖼️ Ảnh sản phẩm:
              </p>
              <div className="flex gap-2 flex-wrap text-gray-800">
                {product.imgs?.map((img: any) => (
                  <img
                    key={img._id}
                    src={img.url}
                    alt="product"
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            </div>

            {product.variants?.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  🔁 Biến thể sản phẩm:
                </p>
                <div className="space-y-3">
                  {product.variants.map((variant: any, idx: number) => (
                    <div
                      key={variant._id || idx}
                      className="p-3 border rounded-md text-sm bg-gray-50 text-gray-800"
                    >
                      <p>
                        <strong>Size:</strong> {variant.attributes?.size} |{" "}
                        <strong>Màu:</strong> {variant.attributes?.color}
                      </p>
                      <p>
                        <strong>Giá:</strong> {variant.price.toLocaleString()} đ
                        | <strong>SL:</strong> {variant.quantity} |{" "}
                        <strong>SKU:</strong> {variant.sku}
                      </p>
                      {variant.img && (
                        <img
                          src={variant.img}
                          alt="variant"
                          className="w-16 h-16 mt-1 object-cover rounded border"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailPopup;
