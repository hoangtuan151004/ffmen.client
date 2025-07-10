'use client'

import { useForm } from "react-hook-form";
import { UserProps } from "../../../types";



export default function ChangePassword({ title }: { title: string }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProps>();

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {/* Tiêu đề */}
      <div className="text-center border-b pb-4">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>


    </div>
  );
}
