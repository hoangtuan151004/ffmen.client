import Image from "next/image"
import React from 'react'

export default function Banner() {
  return (
    <div>
      <Image
        src='/banner/banner.jpg'
        alt=""
        width={1200}
        height={800}
        className="w-full h-[300px] object-top"
      />
    </div>
  )
}
