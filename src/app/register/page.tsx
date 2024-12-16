"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthResponse, RegisterRequest } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "../../api/user";

const Register: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const handleRegister = async (formData: RegisterRequest) => {
    try {
      const response = await registerUser(formData);
      if (response) {
        // Đăng ký thành công, điều hướng đến trang đăng nhập
        router.push("/login");
      } else {
        // Xử lý lỗi đăng ký
        setError("Đăng ký thất bại, vui lòng thử lại.");
        console.error("Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API đăng ký:", error);
      setError("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    handleRegister(data);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full px-4">
      <div className="absolute inset-0 bg-[url('../assets/images/1.jpg')] bg-center bg-cover z-[-1]"></div>

      <div className="wrapper w-96 bg-white/10 p-10 rounded-lg shadow-md backdrop-blur-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-semibold text-black mb-6">Đăng ký</h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}

          {/* Input Tên đăng nhập */}
          <div className="input-field relative mb-6 border-b-2 border-white/30">
            <input
              type="text"
              {...register("username", {
                required: "Tên đăng nhập không được để trống",
                minLength: {
                  value: 6,
                  message: "Tên đăng nhập phải có ít nhất 6 ký tự",
                },
                maxLength: {
                  value: 30,
                  message: "Tên đăng nhập không được quá 30 ký tự",
                },
              })}
              className="w-full bg-transparent outline-none text-black text-lg p-2 peer"
            />
            <label className="absolute top-1/2 transform -translate-y-1/2 left-0 text-gray-400 text-lg pointer-events-none transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-black peer-valid:top-2 peer-valid:text-sm peer-valid:text-black">
              Tên đăng nhập
            </label>
            {errors.username && (
              <p className="text-red-500 text-sm mb-2">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Input Email */}
          <div className="input-field relative mb-6 border-b-2 border-white/30">
            <input
              type="text"
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email không hợp lệ",
                },
                minLength: {
                  value: 6,
                  message: "Email phải có ít nhất 6 ký tự",
                },
                maxLength: {
                  value: 30,
                  message: "Email không được quá 30 ký tự",
                },
              })}
              className="w-full bg-transparent outline-none text-black text-lg p-2 peer"
            />
            <label className="absolute top-1/2 transform -translate-y-1/2 left-0 text-gray-400 text-lg pointer-events-none transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-black peer-valid:top-2 peer-valid:text-sm peer-valid:text-black">
              Nhập email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Input Họ và tên */}
          <div className="input-field relative mb-6 border-b-2 border-white/30">
            <input
              type="text"
              {...register("full_name", {
                required: "Họ và tên không được để trống",
                minLength: {
                  value: 6,
                  message: "Họ và tên phải có ít nhất 6 ký tự",
                },
                maxLength: {
                  value: 30,
                  message: "Họ và tên không được quá 30 ký tự",
                },
              })}
              className="w-full bg-transparent outline-none text-black text-lg p-2 peer"
            />
            <label className="absolute top-1/2 transform -translate-y-1/2 left-0 text-gray-400 text-lg pointer-events-none transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-black peer-valid:top-2 peer-valid:text-sm peer-valid:text-black">
              Họ và tên
            </label>
            {errors.full_name && (
              <p className="text-red-500 text-sm mb-2">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Input Mật khẩu */}
          <div className="input-field relative mb-6 border-b-2 border-white/30">
            <input
              type="password"
              {...register("password", {
                required: "Mật khẩu không được để trống",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
                maxLength: {
                  value: 30,
                  message: "Mật khẩu không được quá 30 ký tự",
                },
              })}
              className="w-full bg-transparent outline-none text-black text-lg p-2 peer"
            />
            <label className="absolute top-1/2 transform -translate-y-1/2 left-0 text-gray-400 text-lg pointer-events-none transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-black peer-valid:top-2 peer-valid:text-sm peer-valid:text-black">
              Nhập mật khẩu
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Input Xác nhận mật khẩu */}
          <div className="input-field relative mb-6 border-b-2 border-white/30">
            <input
              type="password"
              {...register("confirm_password", {
                required: "Mật khẩu không được để trống",
                validate: (value) =>
                  value === watch("password") || "Mật khẩu không trùng khớp",
              })}
              className="w-full bg-transparent outline-none text-black text-lg p-2 peer"
            />
            <label className="absolute top-1/2 transform -translate-y-1/2 left-0 text-gray-400 text-lg pointer-events-none transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-black peer-valid:top-2 peer-valid:text-sm peer-valid:text-black">
              Nhập lại mật khẩu
            </label>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Nút Đăng ký */}
          <button
            type="submit"
            className="bg-[#271930] text-white font-semibold border-none py-3 px-5 rounded-full text-lg border-2 border-transparent transition-all duration-300 ease-in-out hover:bg-white/20 hover:text-black hover:border-white w-full"
          >
            Đăng ký
          </button>

          <div className="register text-center mt-8 text-white">
            <p className="text-black">
              Đã có tài khoản?{" "}
              <Link className="hover:text-[#b31f2a] text-red-500" href="/login">
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
