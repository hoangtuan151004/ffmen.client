import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from "lucide-react"

type TextInputProps = {
    label: string,
    name: string,
    type?: string,
    placeholder: string,
    page?: string,
    className?: string,
    isRequired?: boolean,
    register: any,
    errors: any,
    registerOptions?: any,
}

export default function TextInput({
    label,
    register,
    name,
    errors,
    type,
    placeholder,
    page,
    className = "col-span-full",
    isRequired = true,
    registerOptions,
}: TextInputProps) {

    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";

    return (
        <div className={cn("grid gap-2", className)}>
            {isPasswordField && page === "login" ? (
                <div className="flex items-center">
                    <Label htmlFor={name}>Password</Label>
                    <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>
            ) : (
                <Label className="text-base" htmlFor={name}>
                    {label}
                </Label>
            )}

            <div className="relative mt-2">
                <Input
                    {...register(name, {
                        required: isRequired,
                        ...registerOptions,
                    })}
                    id={name}
                    name={name}
                    type={isPasswordField && !showPassword ? "password" : "text"} // 👈 toggle type
                    autoComplete="off"
                    placeholder={placeholder}
                />

                {isPasswordField && (
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1} // tránh focus tab vào nút này
                    >
                        {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                )}
            </div>

            {errors?.[name] && isRequired && (
                <span className="text-red-600 text-sm">{label} is required</span>
            )}
        </div>
    )
}
