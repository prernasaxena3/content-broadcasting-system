"use client"
function setAuthCookie(token, user) {
  document.cookie = `token=${token}; path=/; SameSite=Lax`
  document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; SameSite=Lax`
}

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { loginSchema } from "@/utils/validators"
import { loginUser } from "@/services/auth.service"
import { setCredentials } from "@/store/slices/authSlice"
import { ROLES } from "@/utils/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function LoginForm() {
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data) => {
    try {
      const { user, token } = await loginUser(data)
      dispatch(setCredentials({ user, token }))
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setAuthCookie(token, user)
      toast.success(`Welcome back, ${user.name}!`)
      if (user.role === ROLES.TEACHER) router.replace("/teacher")
      else if (user.role === ROLES.PRINCIPAL) router.replace("/principal")
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundColor: '#040D12',
        backgroundImage: 'radial-gradient(ellipse at top left, rgba(24,61,61,0.8) 0%, transparent 60%), radial-gradient(circle, rgba(147,177,166,0.06) 1px, transparent 1px)',
        backgroundSize: 'auto, 24px 24px',
      }}
    >
      <div
        className="w-full max-w-md rounded-xl p-8 space-y-6"
        style={{
          background: 'rgba(24, 61, 61, 0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(147,177,166,0.2)',
          boxShadow: '0 4px 32px rgba(4,13,18,0.4)',
        }}
      >
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold" style={{ color: '#D6BD98' }}>
            Content Broadcasting
          </h1>
          <p className="text-sm" style={{ color: '#93B1A6' }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              style={errors.email ? { borderColor: '#f87171' } : undefined}
            />
            {errors.email && (
              <p className="text-xs" style={{ color: '#f87171' }}>{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              style={errors.password ? { borderColor: '#f87171' } : undefined}
            />
            {errors.password && (
              <p className="text-xs" style={{ color: '#f87171' }}>{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in…</>
            ) : "Sign In"}
          </Button>

          <div
            className="mt-4 p-3 rounded-lg text-sm space-y-1"
            style={{
              backgroundColor: 'rgba(4,13,18,0.4)',
              border: '1px solid rgba(147,177,166,0.15)',
              color: '#5C8374',
            }}
          >
            <p className="font-medium" style={{ color: '#93B1A6' }}>Demo credentials:</p>
            <p>Teacher: teacher@demo.com / teacher123</p>
            <p>Principal: principal@demo.com / principal123</p>
          </div>
        </form>
      </div>
    </div>
  )
}
