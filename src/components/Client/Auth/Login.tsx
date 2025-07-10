"use client";
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import SubmitButton from "@/components/FormInput/SubmitButton";
import TextInput from "@/components/FormInput/TextInput";

import { LoginInputProps } from "@/types";
import { UserRole } from "@/types/auth.types";
import { getUserById, loginUser } from "@/services/Auth/auth.service";
import { useAuth } from "@/context/auth-context";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();

  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);

      const result = await loginUser(data);
      const userId = (result?.user as { id?: string })?.id;
      if (!userId || !result.token) {
        throw new Error("Thông tin đăng nhập không hợp lệ");
      }

      // Lưu token vào cookie (tự động gửi trong request)
      Cookies.set("token", result.token, { expires: 7 });

      // Lấy đầy đủ thông tin user
      const fullUser = await getUserById(userId, result.token);

      if (!fullUser || fullUser.isActive === false) {
        toast.error("Tài khoản đã bị vô hiệu hóa");
        return;
      }

      if (!Array.isArray(fullUser.roles)) {
        throw new Error("Thông tin quyền không hợp lệ");
      }

      // Cập nhật user vào context + sessionStorage
      login(fullUser);

      toast.success("Đăng nhập thành công");
      reset();

      // Điều hướng theo vai trò
      if (fullUser.roles.includes(UserRole.ADMIN)) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Đăng nhập thất bại";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="grid grid-cols-2 gap-4 items-center justify-center h-screen">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
          <p className="text-balance text-muted-foreground">
            Nhập email của bạn bên dưới để đăng nhập vào tài khoản của bạn
          </p>
        </div>
        <form
          className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10"
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          method="POST"
        >
          <TextInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />
          <TextInput
            name="password"
            label="Password"
            page="login"
            type="password"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
          <SubmitButton
            title="Login"
            loadingTitle="Logging you please wait..."
            isLoading={isLoading}
          />
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 font-bold">
            Sign up
          </Link>
        </div>
      </div>
      <Image
        src="/image/JettValorant.jpg"
        alt="Description of the image"
        className="w-full h-full object-right rounded-lg shadow-lg dark:brightness-[0.2] dark:grayscale bg-muted hidden lg:block"
        width={1170}
        height={850}
      />
    </div>
  );
}
