"use client";

import { useEffect, useState } from "react";
import { Banner } from "@/components/Banner/Banner";
import Banner2 from "@/components/Banner/Banner2";
// import Category from "@/components/category";
import Latest from "@/components/Latest";
import Products from "@/components/products";
import { getAllProducts } from "@/services/product.service";

export default function Home() {
  const [products, setProducts] = useState<any>([]);
  // const [categories, setCategories] = useState<any>([]);
  const [productHot] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getAllProducts(); // Provide the limit parameter

    setProducts(response?.data.slice(0, 8));
  };

  return (
    <main className=" ">
      <Banner />

      <Latest />

      <Products data={productHot} title="Sản phẩm hot" />
      {/* <Category data={categories} /> */}
      <Banner2 />
      <Products data={products} title="Sản phẩm" />
    </main>
  );
}
