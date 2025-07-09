"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInput/TextInput";
import SubmitButton from "@/components/FormInput/SubmitButton";
import { useAuth } from "@/context/auth-context";
import { JwtPayload } from "../../../types";

export default function Profile({ title }: { title: string }) {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<JwtPayload>();

  // Khi load hoặc khi click edit thì reset lại form theo user
  useEffect(() => {
    if (user?.user) {
      reset({
        fullName: user.user.fullName,
        email: user.user.email,
        phoneNumber: user.user.phoneNumber || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: { fullName: string; email: string; phoneNumber: string }) => {
    try {
      setIsLoading(true);

      // Giả lập API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Cập nhật vào context
      updateUser({
        user: {
          ...user?.user,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
        },
      });

      toast.success("Cập nhật thành công");
      setIsEditing(false);
    } catch {
      toast.error("Cập nhật thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{title}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Họ và tên"
              name="fullName"
              placeholder="Nhập họ và tên"
              type="text"
              register={register}
              errors={errors}
              disabled={!isEditing}
            />
            <TextInput
              label="Email"
              name="email"
              placeholder="john.doe@example.com"
              type="email"
              register={register}
              errors={errors}
              disabled // Không cho sửa email
            />
            <TextInput
              label="Số điện thoại"
              name="phoneNumber"
              placeholder="Nhập số điện thoại"
              type="tel"
              register={register}
              errors={errors}
              disabled={!isEditing}
            />
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              src={user?.user?.avatar ?? "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
              width={128}
              height={128}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {isEditing ? (
            <>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Huỷ
              </Button>
              <SubmitButton
                title="Lưu thay đổi"
                isLoading={isLoading}
                loadingTitle="Đang lưu..."
              />
            </>
          ) : (
            <Button
              type="button"
              className="text-base dark:text-white bg-[#935027] hover:bg-[#412017]"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa thông tin
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
