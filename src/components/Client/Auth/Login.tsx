"use client";
import React from "react";
import TextInput from "../../FormInput/TextInput";
import { useForm } from "react-hook-form";
import SubmitButton from "../../FormInput/SubmitButton";
import { LoginInputProps } from "../../../types";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { UserRole } from "../../../types/auth.types";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();

  async function onSubmit(data: LoginInputProps) {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Login failed";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          console.error("Error parsing login error response:", errorText);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      Cookies.set("token", result.token, { expires: 7 });

      const userRes = await fetch(
        `${API_URL}/api/users/user/${result.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${result.token}`,
          },
        }
      );

      if (!userRes.ok) throw new Error("Không thể lấy thông tin người dùng");

      const userData = await userRes.json();
      const fullUser = userData.user; // ✅ Fix chỗ này

      sessionStorage.setItem("user", JSON.stringify(fullUser));

      toast.success("Đăng nhập thành công");
      setIsLoading(true);
      reset();

      if (
        Array.isArray(fullUser.roles) &&
        fullUser.roles.includes(UserRole.ADMIN)
      ) {
        router.push("/admin");
      } else if (fullUser.roles.includes(UserRole.STAFF)) {
        router.push("/staff");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi");
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
          <Link href="/register" className="underline">
            Sign in
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
