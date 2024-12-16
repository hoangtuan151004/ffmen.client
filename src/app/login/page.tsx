"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "../../api/user";

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await loginUser(data);

      if (!response || !response.data) {
        setError("Đăng nhập không thành công. Vui lòng kiểm tra lại.");
        return;
      }

      const { accessToken, roles } = response.data;

      if (accessToken) {
        if (data.remember) {
          localStorage.setItem("token", accessToken);
          localStorage.setItem("role", roles[0]);
          console.log(localStorage.getItem("role"));
        } else {
          sessionStorage.setItem("token", accessToken);
          sessionStorage.setItem("role", roles[0]); // Lưu role vào sessionStorage
        }
      }

      if (roles && roles.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập", error);
      setError("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen w-full px-4">
        <div className="absolute inset-0 bg-[url('../assets/images/1.jpg')] bg-center bg-cover z-[-1]"></div>
        <div className="wrapper w-96 bg-white/10 p-10 rounded-lg shadow-md backdrop-blur-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-semibold text-black mb-6">
              Đăng nhập
            </h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="input-field relative mb-6 border-b-2 border-white/30">
              <input
                type="text"
                required
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
                Nhập tên đăng nhập hoặc email
              </label>
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mb-2">
                {errors.username.message}
              </p>
            )}

            <div className="input-field relative mb-6 border-b-2 border-white/30">
              <input
                type="password"
                required
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
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}

            <div className="forget flex justify-between items-center mb-6 text-white">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 accent-[#ffdde1]"
                  {...register("remember")}
                />
                <p className="ml-2 text-black">Ghi nhớ tôi</p>
              </label>

              <Link
                className="hover:text-[#b31f2a] text-black no-underline"
                href=""
              >
                Quên mật khẩu
              </Link>
            </div>

            <button
              type="submit"
              className="bg-[#271930] text-white font-semibold border-none py-3 px-5 rounded-full text-lg border-2 border-transparent transition-all duration-300 ease-in-out hover:bg-white/20 hover:text-black hover:border-white w-full"
            >
              Đăng nhập
            </button>

            <div className="register text-center mt-8 text-white">
              <p className="text-black">
                Chưa có tài khoản?{" "}
                <Link
                  className="hover:text-[#b31f2a] text-red-500"
                  href="/register"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
