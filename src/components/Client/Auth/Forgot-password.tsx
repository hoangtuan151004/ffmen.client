'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'

import TextInput from '@/components/FormInput/TextInput'
import SubmitButton from '@/components/FormInput/SubmitButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { RotateCcw, RotateCcwIcon } from "lucide-react"

const steps = [
  { id: 'select', label: 'Chọn phương thức' },
  { id: 'input', label: 'Nhập thông tin' },
  { id: 'otp', label: 'Nhập mã OTP' },
  { id: 'change-password', label: 'Reset Mật khẩu' }
] as const

export default function ForgotPassword() {

  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [step, setStep] = useState<typeof steps[number]['id']>('select')
  const [otp, setOtp] = useState('')
  
  const [method, setMethod] = useState<'email' | 'phone' | null>(null)
  const [cooldown, setCooldown] = useState(0)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm()

  const goToStep = useCallback(
    (targetStep: typeof step) => {
      setStep(targetStep)
      const url = new URL(window.location.href)
      url.searchParams.set('step', targetStep)
      if (method) url.searchParams.set('method', method)
      router.push(url.toString())
    },
    [method, router] // các dependency của callback
  )

  useEffect(() => {
    const urlStep = searchParams.get('step') as typeof step | null
    const methodParam = searchParams.get('method') as 'email' | 'phone' | null

    if (urlStep === 'otp' && methodParam) {
      setMethod(methodParam)
      setStep('input')
      goToStep('input')
    } else if (urlStep && steps.some(s => s.id === urlStep)) {
      setStep(urlStep)
    }
  }, [searchParams, goToStep])



  useEffect(() => {
    let timer: NodeJS.Timeout
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(c => c - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [cooldown])

  const handleMethodSelect = (type: 'email' | 'phone') => {
    setMethod(type)
    reset()
    setOtp('')
    setCooldown(0)
    goToStep('input')
  }

  const onSubmit = async () => {
    const values = getValues()
    const payload: { email?: string; phoneNumber?: string } = {}

    if (method === 'email' && values.email?.trim()) {
      payload.email = values.email.trim().toLowerCase()
    } else if (method === 'phone' && values.phoneNumber?.trim()) {
      const rawPhone = values.phoneNumber.trim()
      payload.phoneNumber = rawPhone.startsWith('+84') ? rawPhone : '+84' + rawPhone.slice(1)
    } else {
      return toast.error('Vui lòng nhập thông tin hợp lệ')
    }

    try {
      setLoading(true)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const res = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      toast.success(result.message || 'OTP đã được gửi!')
      goToStep('otp')
      setCooldown(60)
    } catch {
      toast.error('Không gửi được OTP')
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = () => onSubmit()

  const verifyOtp = async () => {
    const values = getValues()
    const payload = {
      otp: otp.trim(),
      ...(method === 'email'
        ? { email: values.email }
        : { phoneNumber: values.phoneNumber })
    }

    try {
      setLoading(true)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const res = await fetch(`${API_URL}/api/auth/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      toast.success('Xác minh OTP thành công!')
      goToStep('change-password')
    } catch {
      toast.error('Xác minh OTP thất bại')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="grid items-center justify-center bg-gray-100 dark:bg-background px-4 py-10">
      {/* Step Indicator */}
      <div className="relative grid grid-cols-4 items-center justify-between mb-6 gap-4">
        <div className="absolute left-0 right-0 top-3 h-0.5 bg-gray-300 z-0" />
        {steps.map((s, i) => {
          const isActive = step === s.id
          const isCompleted = steps.findIndex(st => st.id === step) > i

          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center text-center flex-1">
              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center mb-1 transition-colors duration-300
                  ${isActive
                    ? 'bg-primary text-white border-primary'
                    : isCompleted
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-muted text-muted-foreground border-gray-300'
                    }
                `}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs sm:text-sm transition-colors duration-300
                  ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
              >
                {s.label}
              </span>
            </div>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Khôi phục mật khẩu</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'select' && (
            <div className="flex justify-center gap-4">
              <Button onClick={() => handleMethodSelect('email')}>Xác minh Email</Button>
              <Button onClick={() => handleMethodSelect('phone')}>Xác minh SĐT</Button>
            </div>
          )}

          {step === 'input' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {method === 'email' ? (
                <TextInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  register={register}
                  errors={errors}
                />
              ) : (
                <TextInput
                  name="phoneNumber"
                  label="Số điện thoại"
                  type="tel"
                  placeholder="098xxxxxxx"
                  register={register}
                  errors={errors}
                />
              )}
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Đang gửi...' : 'Gửi OTP'}
                </Button>
                <Button type="button" variant="ghost" className="flex-1" onClick={() => goToStep('select')}>
                  Quay lại
                </Button>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <div className="space-y-2 pt-4">
              <label className="text-sm font-medium">Nhập mã OTP</label>
              <div className="flex gap-2 items-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={resendOtp}
                  disabled={cooldown > 0 || loading}
                  className="flex items-center gap-1"
                >
                  {cooldown > 0 ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      {cooldown}s
                    </>
                  ) : <>
                    <RotateCcwIcon /> Gửi lại
                  </>
                  }
                </Button>
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  className="flex-1"
                  onClick={verifyOtp}
                  disabled={otp.length !== 6 || loading}
                >
                  {loading ? 'Đang xác minh...' : 'Xác minh OTP'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => {
                    reset()
                    setOtp('')
                    setCooldown(0)
                    goToStep('select')
                  }}
                >
                  Quay lại
                </Button>
              </div>
            </div>
          )}

          {step === 'change-password' && (
            <div className="space-y-2 pt-4">
              <TextInput
                label="Reset mật khẩu"
                placeholder="**********"
                name="password"
                type="password"
                register={register}
                errors={errors}
              />
              <SubmitButton
                title="Save change password"
                loadingTitle="Saving change you please wait..."
                isLoading={loading}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
