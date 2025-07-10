'use client'
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import TextInput from "@/components/FormInput/TextInput"
import SubmitButton from "@/components/FormInput/SubmitButton"
import { Alert } from "@/components/ui/alert"

import { registerUser } from "@/services/Auth/auth.service"
import { RegisterInputProps } from "@/types"



export default function Register() {
  const [showNotification] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<RegisterInputProps>()

  const password = watch("password");

  async function onSubmit(data: RegisterInputProps) {
    const payload = { ...data };
    try {
      setIsLoading(true)
      await registerUser(payload)
      toast.success("Đăng ký thành công")
      reset()
      router.push("/login")
    } catch (error) {
      console.error("Register error:", error)
      toast.error(
        error instanceof Error ? error.message : "Đã xảy ra lỗi khi đăng ký"
      )
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="container lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)} method="POST">
            {showNotification && (
              <Alert color="failure" >
                <span className="font-medium">Sign-in error!</span> Please Check
                your credentials
              </Alert>
            )}

            <TextInput
              label='Full Name'
              register={register}
              name='fullName'
              type='text'
              errors={errors}
              placeholder='Nguyen Van A'
              className="col-span-1"
            />

            <TextInput
              label='Phone'
              register={register}
              name='phoneNumber'
              type='tel'
              errors={errors}
              placeholder='0123456789'
              className="col-span-1"
            />

            <TextInput
              label='Email'
              register={register}
              name='email'
              type='email'
              errors={errors}
              placeholder='abc@def.xyz'
            />

            <TextInput
              label='Password'
              register={register}
              name='password'
              type='password'
              errors={errors}
              placeholder='********'
            />
            <TextInput
              label="ConfirmPassword"
              placeholder="********"
              register={register}
              name="confirmPassword"
              type="password"
              errors={errors}
              registerOptions={{
                validate: (value: string) =>
                  value === password || "Mật khẩu xác nhận không khớp",
              }}
            />
            <SubmitButton
              title='Create an account'
              isLoading={isLoading}
              loadingTitle='Creating an account please wait ...'
            />

          </form>
          <div className="mt-4 text-center text-sm">
            Have an account?{" "}
            <Link href="/login" className="text-blue-500 font-bold">
              Sign in now
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/image/JettValorant.jpg"
          alt="Image"
          width="1170"
          height="850"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
