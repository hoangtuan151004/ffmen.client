"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link"; // Thêm dòng này nếu bạn đang sử dụng Next.js

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e1e1e]">
      <div className="  px-[50px] py-[50px] flex lg:gap-[150px] gap-[50px] lg:flex-row flex-col ">
        <div className="text-white flex flex-col gap-[10px]">
          <span className="font-bold text-[26px]">Liên hệ</span>
          <p className="font-normal text-[#bbb]">
            <span>Địa chỉ:</span> 18/4 Mỹ Huề , Trung Chánh Hóc Môn
          </p>
          <p className="font-normal text-[#bbb]">
            <span>Số điện thoại:</span> (+84) 3770 812 / (+01) 1231 1231
          </p>
          <p className="font-normal text-[#bbb]">
            <span>Email:</span> toanpt@gmail.com
          </p>
        </div>
        <div className="flex flex-col gap-[10px] text-white">
          <p className="font-bold text-[26px]">Về chúng tôi</p>
          <Link
            className="hover:text-[#b31f2a] font-normal text-[#bbb]"
            href=""
          >
            Liên hệ trực tiếp
          </Link>
          <Link
            className="hover:text-[#b31f2a] font-normal text-[#bbb]"
            href=""
          >
            Sự kiện
          </Link>
          <Link
            className="hover:text-[#b31f2a] font-normal text-[#bbb]"
            href=""
          >
            Giới thiệu
          </Link>
          <Link
            className="hover:text-[#b31f2a] font-normal text-[#bbb]"
            href=""
          >
            Hoạt động của công ty
          </Link>
        </div>
        <div className="flex flex-col gap-[10px] text-white">
          <p className="font-bold text-[26px]">Khách hàng</p>
          <Link
            className="hover:text-[#b31f2a] font-normal text-[#bbb]"
            href=""
          >
            Liên hệ trực tiếp
          </Link>
          <Link
            className="hover:text-[#b31f2a] font-normal text-[#bbb]"
            href=""
          >
            Sự kiện
          </Link>
          <Link
            className="hover:text-[#b31f2a] font-normal text-[#bbb]"
            href=""
          >
            Giới thiệu
          </Link>
          <Link
            className="hover:text-[#b31f2a] font-normal text-[#bbb]"
            href=""
          >
            Hoạt động của công ty
          </Link>
        </div>
        <div className="text-white flex flex-col gap-[20px]">
          <span className="font-bold text-[26px]">Theo dõi FFive</span>
          <div className="flex gap-[20px] text-[20px] ">
            <Link
              className="hover:text-[#b31f2a] font-normal text-[#bbb]"
              href=""
            >
              <FontAwesomeIcon className="w-[20px] " icon={faFacebook} />
            </Link>
            <Link
              className="hover:text-[#b31f2a] font-normal text-[#bbb]"
              href=""
            >
              <FontAwesomeIcon className="w-[20px]" icon={faInstagram} />
            </Link>
            <Link
              className="hover:text-[#b31f2a] font-normal text-[#bbb]"
              href=""
            >
              <FontAwesomeIcon className="w-[20px]" icon={faTwitter} />
            </Link>
            <Link
              className="hover:text-[#b31f2a] font-normal text-[#bbb]"
              href=""
            >
              <FontAwesomeIcon className="w-[20px]" icon={faLinkedin} />
            </Link>
          </div>
        </div>
      </div>
      <div className=" bg-[#333] flex  py-[30px] ">
        <div className="container mx-auto px-4 flex lg:flex-row flex-col gap-12 justify-between   ">
          <div className="flex flex-col gap-[10px]">
            <h2 className="">Đăng ký nhận bản tin</h2>
            <p className="">
              Nhận thông tin cập nhật qua E-mail về cửa hàng mới nhất của chúng
              tôi và
            </p>
          </div>
          <div className="flex justify-center ">
            <input
              className="pl-[21px] py-[5px] bg-[#585a5e] rounded-tl-[10px] rounded-bl-[10px] text-gray-500 leading-9 text-[20px]"
              type="text"
              defaultValue="example@email.com"
            />
            <button className=" rounded-tr-[10px] rounded-br-[10px] bg-[#b31f2a] text-white px-[10px] py-[9px] text-[15px] font-bold leading-9">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
