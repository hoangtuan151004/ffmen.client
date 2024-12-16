"use client";

import { useEffect, useState } from "react";
import { Banner } from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import Category from "@/components/category";
import Latest from "@/components/Latest";
import Products from "@/components/products";
import { getAllProducts } from "@/api/products";
import { getAllCategory } from "@/api/categories";
import { getProductHot } from "@/api/products";
export default function Home() {
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [productHot, setProductHot] = useState<any>([]);
  useEffect(() => {
    fetchProducts();
    fetchCategory();
    fetchProductHot();
  }, []);

  const fetchProducts = async () => {
    const response = await getAllProducts(); // Provide the limit parameter

    setProducts(response?.data.slice(0, 8));
  };
  const fetchCategory = async () => {
    const response = await getAllCategory();
    setCategories(response);
  };
  const fetchProductHot = async () => {
    const response = await getProductHot();
    setProductHot(response?.data.slice(0, 4));
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
