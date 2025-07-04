import React from 'react'
import CardProduct from "@/components/card-product"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel"
import { Category, IProduct } from "../../../types";
interface ListProductProps {
  Product: IProduct[];
  Categories: Category[];
}
export default function ListProduct({ Product, Categories }: ListProductProps) {
  return (
    <div className="relative space-y-10">

      {/* Hiển thị từng category cha */}
      {Categories.filter(cate => !cate.parentCategory || cate.parentCategory === "").map((parent) => (
        <div key={parent._id} className="flex flex-col gap-3">
          {/* Tên category cha */}
          <h1 className="text-3xl font-bold">{parent.name}</h1>

          {/* Hiển thị các category con */}
          <div className="flex items-center gap-3 flex-wrap">
            {Categories
              .filter(child => child.parentCategory === parent._id)
              .map((child) => (
                <span
                  key={child._id}
                  className="px-5 py-2 border border-slate-700 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-500 cursor-pointer transition-colors"
                >
                  {child.name}
                </span>
              ))}
          </div>
        </div>
      ))}

      {/* Carousel hiển thị sản phẩm */}
      <Carousel className="flex justify-center relative py-3">
        <CarouselContent className="flex items-center">
          {Product.length > 0 ? (
            Product.map((item) => (
              <CarouselItem
                key={item._id}
                className="flex justify-center shadow-lg basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CardProduct
                  name={item.name}
                  imgs={item.imgs}
                  price={item.price}
                  discountPrice={item.discountPrice}
                  category={item.category}
                />
              </CarouselItem>
            ))
          ) : (
            <p className="text-center w-full py-5">Không có sản phẩm nào.</p>
          )}
        </CarouselContent>

        {/* Nút chuyển carousel */}
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10
           bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition
           dark:bg-slate-600 dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-500"
        />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10
         bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition
         dark:bg-slate-600 dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-500"
        />
      </Carousel>
    </div>
  )
}
