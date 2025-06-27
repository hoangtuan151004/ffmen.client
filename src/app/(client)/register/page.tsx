import React from 'react'
import Register from "@/components/Client/Auth/Register"

export const metadata = {
  title: "Đăng ký tài khoản",
  description: "Đăng nhập để truy cập tài khoản, đơn hàng và tính năng cá nhân hóa.",
};

export default function page() {
  return (
    <div className="container-wrapper">
      <div className="container p-0">
        <Register />
      </div>
    </div>  )
}
