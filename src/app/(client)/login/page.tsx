import React from 'react'
import Login from "@/components/Client/Auth/Login"

export const metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập để truy cập tài khoản, đơn hàng và tính năng cá nhân hóa.",
};


export default function page() {
  return (
    <div className="container-wrapper">
      <div className="container p-0">
        <Login />
      </div>
    </div>
  )
}
