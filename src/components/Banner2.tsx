import React from "react";
import img from "@/assets/images/img5.png";
const Banner2: React.FC = () => {
  return (
    <div className="banner-2 flex bg-[#232536]  px-[150px] lg:flex-row flex-col">
      <div className="banner-2-left lg:w-[40%] w-[100%] py-[86px] flex flex-col gap-4  ">
        <span className="text-[16px] leading-[20px]">TESTIMONIALs</span>
        <h2 className="text-[36px] leading-[48px] font-bold">
          KHÁCH HÀNG NÓI GÌ VỀ BLOG CỦA CHÚNG TÔI?
        </h2>
        <p className="text-[16px] leading-[28px]">
          "Blog này thực sự hữu ích và cung cấp rất nhiều thông tin về thời
          trang. Những mẹo và xu hướng luôn giúp tôi tự tin hơn trong việc lựa
          chọn phong cách của mình!"
        </p>
      </div>
      <div className="banner-2-right lg:w-[60%] w-[100%] py-[39px] lg:pl-[162px] flex flex-col gap-[107px]">
        <p className="text-[24px] leading-[32px] font-bold">
          "Blog này thực sự hữu ích và cung cấp rất nhiều thông tin về thời
          trang. Những mẹo và xu hướng luôn giúp tôi tự tin hơn trong việc lựa
          chọn phong cách của mình!"
        </p>
        <div className="right-item flex gap-[90px] lg:flex-row flex-col ">
          <div className="banner-2-info flex gap-[15px]">
            <img src={img.src} className="w-[44px] h-[44px]" alt="" />
            <div className="info flex flex-col gap-[5px]">
              <h2 className="text-[24px] leading-[32px] font-bold">
                Jonathan Vallem
              </h2>
              <span className="text-4 leading-7 font-normal">
                New York, <br />
                USA
              </span>
            </div>
          </div>
          <div className="flex gap-[7px] items-center">
            <button className=" rounded-[50%] bg-white text-black w-[48px] h-[48px]">
              &#8592;
            </button>
            <button className="rounded-[50%] bg-[#FF5959] text-black w-[62px] h-[62px]">
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner2;
