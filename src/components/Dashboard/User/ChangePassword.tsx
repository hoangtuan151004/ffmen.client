'use client'

import { useForm } from "react-hook-form";
import TextInput from "../../FormInput/TextInput";
import toast from "react-hot-toast";
import SubmitButton from "../../FormInput/SubmitButton";
import { useState } from "react";
import { changeUserPassword } from "../../../services/user.service";
import { getCookies } from "@/lib/getToken";
import { ChangePasswordProps } from "@/types";
import { useParams } from "next/navigation";

export default function ChangePassword({ title }: { title: string }) {
  const { id } = useParams<{ id: string }>(); // 🔑 Lấy id từ URL
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordProps>();

  const newPassword = watch("newPassword");

  async function onSubmit(data: ChangePasswordProps) {
    try {
      setIsLoading(true);

      if (!id) {
        toast.error("Không tìm thấy người dùng");
        return;
      }

      const token = await getCookies();
      await changeUserPassword(id, token, data.newPassword);

      toast.success("Đổi mật khẩu thành công");
      reset();
    } catch {
      toast.error("Lỗi server");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center border-b pb-4">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Old Password"
          name="password"
          register={register}
          placeholder="********"
          errors={errors}
          type="password"
        />
        <TextInput
          label="New Password"
          name="newPassword"
          register={register}
          placeholder="********"
          errors={errors}
          type="password"
        />
        <TextInput
          label="Confirm Password"
          name="confirmPassword"
          register={register}
          placeholder="********"
          errors={errors}
          type="password"
          registerOptions={{
            validate: (value: string) =>
              value === newPassword || "Mật khẩu xác nhận không khớp",
          }}
        />
        <SubmitButton
          title="Change Password"
          loadingTitle="Password saving, please wait"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
