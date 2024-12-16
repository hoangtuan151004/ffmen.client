import React from "react";
import img from "@/assets/images/img.jpg";
const Latest: React.FC = () => {
  return (
    <div className="latest  pt-[111px] pb-[58px]  bg-slate-200 ">
      <div className="lg:container container mx-auto px-[50px] flex lg:flex-row flex-col lg:gap-0 gap-9 ">
        <div className="latest-left lg:w-[60%] w-[100%] flex flex-col text-black ">
          <h2 className="title lg:text-[36px] text-[30px] leading-[20px] font-bold pb-[63px]">
            Mới nhất
          </h2>
          <div className="latest-left-content pl-[22px]">
            <img src={img.src} alt="" className="w-[100%]" />

            <h2 className="text-[28px] leading-[40px] font-bold">
              Giảm Giá Sốc Đến 70%!
            </h2>
            <p className="latest-desc text-[16px] leading-[28px] font-normal pb-[45px]">
              Mùa mua sắm chưa bao giờ hấp dẫn hơn! Hãy tận hưởng cơ hội siêu
              giảm giá với những bộ sưu tập thời trang đẳng cấp, phong cách lịch
              lãm và sang trọng. Nhanh tay, số lượng có hạn!
            </p>
            <button className="rounded-[10px] bg-[#FF5959] w-[fit-content] px-[92px] py-[21px] text-white hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125">
              Mua Ngay
            </button>
          </div>
        </div>
        <div className="latest-right flex flex-col lg:w-[40%] w-[100%] pl-[18px] text-black">
          <div className="flex justify-between ">
            <h2 className="title lg:text-[36px] text-[30px] leading-[20px] font-bold pb-[63px] ">
              Tin tức thịnh hành
            </h2>
            <h2 className="text-[16px] leading-3">Xem tất cả</h2>
          </div>

          <div className="latest-right-content w-[100%] pl-[18px] flex flex-col lg:gap-[60px] gap-[40px]">
            <div className=" flex flex-col gap-2">
              <span className="text-[14px] leading-[20px">
                By Fashion Guru | Ngày 12 Tháng 3, 2024
              </span>
              <h2 className="leading-[40px] text-[28px]">
                Bí Quyết Phối Đồ Sang Trọng Cho Mùa Mới <br />
              </h2>
            </div>
            <div className="bg-[#FF5959] w-fit px-[30px] py-[41px] flex flex-col gap-2">
              <span className="text-[14px] leading-[20px] ">
                By Fashion Guru | Ngày 12 Tháng 3, 2024
              </span>
              <h2 className="leading-[40px] text-[28px]">
                5 Món Đồ Không Thể Thiếu Trong Tủ Quần Áo
              </h2>
            </div>
            <div className=" flex flex-col gap-2">
              <span className="text-[14px] leading-[20px">
                By Fashion Guru | Ngày 12 Tháng 3, 2024
              </span>
              <h2 className="leading-[40px] text-[28px]">
                Cách Lựa Chọn Trang Phục Phù Hợp Mọi Dáng Người
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[14px] leading-[20px">
                By Fashion Guru | Ngày 12 Tháng 3, 2024
              </span>
              <h2 className="leading-[40px] text-[28px]">
                Xu Hướng Màu Sắc Nổi Bật Của Năm 2024
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Latest;
