import React from "react";
import bn1 from "@/assets/images/k33.jpeg";
import bn2 from "@/assets/images/u1.jpeg";
import bn3 from "@/assets/images/u2.jpeg";
import bn4 from "@/assets/images/u4.jpeg";
import Link from "next/link";
export function Banner() {
  return (
    <div
      className="banner flex bg-cover bg-center bg-no-repeat bg-[url('../assets/images/1.jpg')] overflow-hidden px-[20px] py-[30px] h-auto min-h-[100vh] md:pl-[50px] md:py-[20px] lg:pl-[100px] lg:py-[30px] lg:h-lvh items-center relative
  lg:flex-row flex-col"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="banner-left w-full md:w-[60%] lg:w-[50%] relative z-10">
        <div className="banner-content-left flex flex-col gap-[20px] md:gap-[25px] lg:gap-[30px]">
          <h1 className="text-[30px] leading-[40px] md:text-[50px] md:leading-[60px] lg:text-[70px] lg:leading-[89px] text-white">
            FFive Men – Thời trang đẳng cấp, phong cách nam giới.
          </h1>
          <p className="text-[14px] leading-[18px] md:text-[16px] md:leading-[22px] lg:text-[18px] text-white">
            FFive Men là thương hiệu thời trang nam với sứ mệnh mang đến phong
            cách lịch lãm, hiện đại và đẳng cấp cho phái mạnh...
          </p>
          <Link href="/product">
            <button className="bg-[#FF5959] rounded-[10px] w-[fit-content] px-[20px] py-[9px] hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125">
              Xem ngay
            </button>
          </Link>
        </div>
      </div>

      <div className="banner-right w-full md:w-[40%] lg:w-[50%] relative z-10 md:mt-[15px] lg:mt-0 lg:top-[-40%]">
        <div className="image relative flex md:flex-row lg:flex-col">
          <img
            src={bn1.src}
            className="z-[1] absolute object-cover w-[120px] h-[220px] md:w-[150px] md:h-[250px] lg:w-[200px] lg:h-[350px] top-[60px] md:top-[60px] lg:top-[80px] right-[358px] md:right-[258px] lg:right-[398px]"
          />
          <img
            src={bn2.src}
            className="z-[3] absolute object-cover w-[120px] h-[220px] md:w-[150px] md:h-[250px] lg:w-[200px] lg:h-[350px] top-[170px] md:top-[170px] lg:top-[280px] right-[280px] md:right-[180px] lg:right-[283px]"
          />
          <img
            src={bn3.src}
            className="z-[2] absolute object-cover w-[120px] h-[220px] md:w-[150px] md:h-[250px] lg:w-[200px] lg:h-[350px] top-[0px] md:top-[0px] lg:top-[0px] right-[250px] md:right-[150px] lg:right-[220px]"
          />
          <img
            src={bn4.src}
            className="z-[4] absolute object-cover w-[120px] h-[220px] md:w-[150px] md:h-[250px] lg:w-[200px] lg:h-[350px] top-[80px] md:top-[80px] lg:top-[150px] right-[180px] md:right-[80px] lg:right-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
export default Banner;
