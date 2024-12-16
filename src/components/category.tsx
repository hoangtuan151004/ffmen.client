import img1 from "@/assets/images/img3.png";
import React, { useEffect, useState } from "react";
type Category = {
  data: [];
};
const Category: React.FC<Category> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <h2>Category All</h2>
      <div className="category flex gap-[50px] px-[50px] py-[66px] justify-center ">
        {data &&
          data.map((item: any) => (
            <div className="category-list flex flex-wrap justify-center gap-[52px]">
              <div className="category-item flex flex-col gap-[30px] bg-[#F4F0F8] rounded-[10px]  px-4 py-2 w-[255px] h-[266px] items-center ">
                <span className="text-black text-[20px] leading-[30px] font-bold">
                  <p>{item.name}</p>
                </span>
                <p className="content text-black text-[14px] leading-[21px] font-normal text-center">
                  Lorem ipsum dolor sit amet consectetur. Urna dignissim ac
                  egeendrerit in.
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
