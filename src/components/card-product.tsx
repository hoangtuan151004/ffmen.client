import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { ShoppingBagIcon } from "lucide-react"
import { IProduct } from "../types"



export default function CardProduct({ imgs, name, price, discountPrice, _id, category }: IProduct) {
  return (
    <Card
      key={_id}
      className="w-full max-w-xs shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={imgs[0]?.url}
          alt={name}
          height={150}
          width={150}
          className="w-full h-fit object-cover"
        />
      </CardHeader>

      <CardContent className="p-4">
        <h1 className="text-base font-semibold text-gray-800 mb-2 truncate">
          {name} - {category.name}
        </h1>


        <CardDescription className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 line-through">$ {discountPrice} </span>
          <span className="text-lg text-red-500 font-bold">${price}</span>
        </CardDescription>
      </CardContent>

      <CardFooter className="px-4 pb-4">
        <Button className="w-full gap-2 bg-indigo-600">
          <ShoppingBagIcon className="w-5 h-5" />
          Thêm vào giỏ hàng
        </Button>
      </CardFooter>
    </Card>
  )
}
