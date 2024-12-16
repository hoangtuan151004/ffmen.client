"use client";
import React, { useEffect, useState } from "react";
import Products from "../../components/products";
import ReactPaginate from "react-paginate";
import { Category, Data } from "@/types/index";
import { getAllProducts, getProductsByCategory } from "../../api/products";
import { fetchCategories } from "../../api/categories";
import axios from "axios";

const Product: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | string>(
    ""
  );
  const [error, setError] = useState<string>("");

  // Fetch danh sách category từ API
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getCategories();
  }, []);

  // Fetch danh sách sản phẩm ban đầu
  const fetchAllProducts = async (page: number) => {
    const response = await getAllProducts();
    const startIndex = page * productsPerPage;
    const paginatedProducts = response.data.slice(
      startIndex,
      startIndex + productsPerPage
    );
    setProducts(paginatedProducts);
    setPageCount(Math.ceil(response.data.length / productsPerPage));
  };

  // Xử lý click category
  const handleCategoryClick = async (category: Category | string) => {
    console.log("Danh mục được chọn:", category);
    setSelectedCategory(category === "all" ? "" : (category as Category).name);
    setCurrentPage(0);

    if (category === "all") {
      // Hiển thị tất cả sản phẩm
      fetchAllProducts(0);
      return;
    }

    try {
      const accessToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!accessToken) {
        console.error("Không tìm thấy access token.");
        return;
      }

      const encodedCategory = encodeURIComponent((category as Category)._id);
      const url = `http://localhost:3000/products/category/${encodedCategory}`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProducts(data.products);
      setPageCount(Math.ceil(data.products.length / productsPerPage));
    } catch (err) {
      console.error("Không thể lấy danh mục sản phẩm:", err.message);
    }
  };

  const handlePageClick = (event: any) => {
    const selected = event.selected;
    setCurrentPage(selected);
    fetchAllProducts(selected);
  };

  useEffect(() => {
    fetchAllProducts(currentPage);
  }, [currentPage]);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="px-6 md:px-10 lg:px-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-4xl font-bold mb-2">Thời Trang Nữ</h2>
          <p className="text-lg leading-relaxed">
            Khám phá những sản phẩm mới nhất và chất lượng nhất dành cho bạn.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-6 md:px-10 lg:px-20">
        {/* Sidebar Category */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-md rounded-lg p-6 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Danh mục
          </h2>
          <button
            onClick={() => handleCategoryClick("all")}
            className={`block w-full text-left py-2 px-4 rounded-lg transition duration-300 text-black ${
              selectedCategory === ""
                ? "bg-indigo-100 text-indigo-600"
                : "hover:bg-gray-100"
            }`}
          >
            Tất cả
          </button>
          {categories.map((category: Category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category)}
              className={`block w-full text-left py-2 px-4 rounded-lg transition duration-300 text-black ${
                selectedCategory === category.name
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </aside>

        {/* List Products */}
        <section className="w-full md:w-3/4 lg:w-4/5 text-black">
          <Products data={products} />
          <ReactPaginate
            previousLabel={"Trước"}
            nextLabel={"Sau"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-8 space-x-2 text-black"
            pageClassName="px-3 py-2 text-black bg-white border rounded-lg"
            previousLinkClassName="px-4 text-black py-2 bg-white text-black border rounded-lg"
            nextLinkClassName="px-4 py-2 text-black bg-white border rounded-lg"
            disabledClassName="opacity-50 cursor-not-allowed pointer-events-none text-black"
            activeClassName="px-3 py-2 text-white bg-indigo-600 rounded-lg"
            forcePage={currentPage}
          />
        </section>
      </div>
    </main>
  );
};

export default Product;
