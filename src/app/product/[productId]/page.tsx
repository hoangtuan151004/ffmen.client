"use client";

import React, { useEffect, useState } from "react";
import { getProductDetail, relatedProducts } from "@/api/products";
import { Data } from "../../../types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import img from "@/assets/images/sze.png";
import img2 from "@/assets/images/sze1.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";

interface Params {
  params: {
    productId: string;
  };
}

const ProductDetailPage: React.FC<Params> = ({ params }) => {
  const [product, setProduct] = useState<Data | null>(null);
  const [related, setRelated] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // Sử dụng useDispatch để lấy dispatch từ Redux
  const dispatch = useDispatch();
  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductDetail(params.productId);
        console.log("Dữ liệu sản phẩm:", data);
        if (data) {
          setProduct(data);
          setProductQuantity(data.quantity);
          fetchRelatedProducts(data.category.categoryId);
        } else {
          setError("Không thể lấy thông tin sản phẩm");
        }
      } catch (err) {
        setError("Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [params.productId]);

  const fetchRelatedProducts = async (cateId: string) => {
    try {
      const relatedData = await relatedProducts(cateId);
      console.log({ relatedData: Object(relatedData) });
      setRelated(Object(relatedData).data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm liên quan:", err);
    }
  };

  if (loading) return <div>Đang t���i dữ liệu...</div>;
  if (error) return <div>{error}</div>;
  const handleAddToCart = () => {
    dispatch(addToCart({ item: product, quantity }));
    setShowSuccessPopup(true); // Hiển thị thông báo

    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  return (
    <div className="bg-white">
      {/* Popup thông báo thêm vào giỏ hàng thành công */}
      {showSuccessPopup && (
        <div className="fixed top-10 right-10 bg-green-500 text-white p-4 rounded shadow-md z-50">
          <p>Thêm sản phẩm vào giỏ hàng thành công!</p>
        </div>
      )}
      {product && (
        <div className="text-black flex flex-col container mx-auto">
          <div className="flex">
            <img
              src={`http://localhost:3000/images/${product.img}`}
              alt={product.name}
              className="w-[700px]"
            />

            <div className="flex flex-col gap-[30px] pt-[100px] px-[50px]">
              <h1 className="text-[36px] text-black leading-[20px] font-bold pb-[63px]">
                {product.name}
              </h1>
              <div>
                <h3 className="text-black text-[28px] leading-[20px] font-semibold pb-[20px]">
                  Mô tả sản phẩm:
                </h3>
                <p>
                  {product.description
                    ? product.description
                    : "Sản phẩm không có thông tin."}
                </p>
              </div>
              <p>Giá: {formatCurrency(product.price)}</p>
              <div className="flex gap-[20px]">
                <p>Size:</p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="text-[#b31f2a] text-[16px] rounded-md hover:text-blue-700 transition"
                >
                  Hướng dẫn chọn size
                </button>

                {showPopup && (
                  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-[700px] relative overflow-y-auto max-h-[90vh] pt-[50px]">
                      <button
                        onClick={() => setShowPopup(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                      <h2 className="text-xl font-semibold mb-4">
                        Hướng dẫn chọn size
                      </h2>
                      <div className="flex flex-col gap-[20px]">
                        <p className="text-gray-700">
                          Nếu bạn băn khoăn không biết chọn size nào cho phù hợp
                          với cân nặng và chiều cao của mình, đừng lo lắng! Hãy
                          xem bảng hướng dẫn chọn size bên dưới mà
                          <span className="text-[#b31f2a]">
                            &nbsp;FFive Men&nbsp;
                          </span>{" "}
                          tư vấn riêng dành cho bạn.
                        </p>
                        <div>
                          <img src={img.src} alt="" />
                          <img src={img2.src} alt="" />
                        </div>
                        <p className="text-gray-700">
                          Bảng hướng dẫn chọn size trên là bảng hướng dẫn dựa
                          trên kinh nghiệm nhiều năm của
                          <span className="text-[#b31f2a]">
                            &nbsp;FFive Men&nbsp;
                          </span>{" "}
                          theo khảo sát nhu cầu sở thích của khách hàng.
                        </p>
                        <p className="text-gray-700">
                          Nếu bạn vẫn còn có những thắc mắc, hãy liên hệ ngay
                          với Bộ phận Chăm sóc khách hàng của
                          <span className="text-[#b31f2a]">
                            &nbsp;FFive Men&nbsp;
                          </span>{" "}
                          qua Hotline (+84) 3770 812 để được hỗ trợ thêm.
                        </p>
                      </div>

                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={() => setShowPopup(false)}
                          className="bg-[#FF5959] rounded-[10px] w-[fit-content] px-[20px] py-[9px] hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125"
                        >
                          Đóng cửa sổ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-4 text-white">
                {/* Thêm các lựa chọn size */}
                <label className="hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125">
                  <input
                    type="radio"
                    name="size"
                    defaultValue="S"
                    className="hidden"
                  />
                  <span className="bg-slate-400 px-4 py-2 cursor-pointer">
                    S
                  </span>
                </label>
                <label className="hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125">
                  <input
                    type="radio"
                    name="size"
                    defaultValue="S"
                    className="hidden"
                  />
                  <span className="bg-slate-400 px-4 py-2 cursor-pointer">
                    M
                  </span>
                </label>
                <label className="hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125">
                  <input
                    type="radio"
                    name="size"
                    defaultValue="S"
                    className="hidden"
                  />
                  <span className="bg-slate-400 px-4 py-2 cursor-pointer">
                    L
                  </span>
                </label>
                <label className="hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125">
                  <input
                    type="radio"
                    name="size"
                    defaultValue="S"
                    className="hidden"
                  />
                  <span className="bg-slate-400 px-4 py-2 cursor-pointer">
                    XL
                  </span>
                </label>
                {/* Các label khác cho M, L, XL */}
              </div>

              <div className="flex items-center space-x-4">
                <span>Số lượng:</span>
                {/* <button
                  className="bg-slate-400 px-2 py-1 hover:text-[#b31f2a]"
                  onClick={() =>
                    setProductQuantity((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={productQuantity <= 1}
                >
                  -
                </button> */}
                <div className="quantity">
                  <input
                    className="number"
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value, 10);
                      if (!isNaN(newValue)) {
                        setQuantity(newValue);
                      }
                    }}
                  />
                </div>
                {/* <button
                  className="bg-slate-400 px-2 py-1 hover:text-[#b31f2a]"
                  onClick={() => setProductQuantity((prev) => prev + 1)}
                >
                  +
                </button> */}
              </div>

              <div className="bnt-cart-right">
                <button
                  type="submit"
                  className="btn-cart bg-[#FF5959] text-white rounded-[10px] w-[fit-content] px-[20px] py-[9px] hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-black py-[50px] flex flex-col container mx-auto">
        <h2 className="text-black text-[36px] leading-[20px] font-bold pb-[63px]">
          Sản phẩm liên quan
        </h2>
        <div className="card flex justify-center gap-[20px] flex-wrap">
          {related.map((item, index) => (
            <div key={item._id}>
              <Link href={`/product/${item._id}`}>
                <div className="card-item flex flex-col text-black rounded-lg bg-white w-[280px] transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg overflow-hidden">
                  {/* Product Image */}
                  <img
                    src={`http://localhost:3000/images/${item.img}`}
                    alt="Product Image"
                    className="card-item-img w-full h-[200px] object-cover"
                  />

                  {/* Product Info */}
                  <div className="p-4 flex flex-col text-black gap-4">
                    <h2 className="text-[20px] font-bold leading-[24px] text-center hover:text-[#b31f2a] transition duration-300">
                      {item.name}
                    </h2>

                    <div className="card-item-info flex justify-between items-center">
                      <div className="info flex flex-col gap-1">
                        <p className="text-[16px] font-semibold">
                          {formatCurrency(item.price)}
                        </p>
                        <span className="text-[14px] text-gray-500">
                          Số lượng: {item.quantity}
                        </span>
                      </div>

                      <Link href={`/product/${item._id}`}>
                        <button className="bg-[#ffa1a1] text-white rounded-full px-4 py-2 font-medium hover:bg-[#b31f2a] transition-colors duration-300 transform hover:scale-105">
                          Chi tiết
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
