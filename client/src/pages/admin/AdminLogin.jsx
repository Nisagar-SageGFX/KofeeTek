import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Coffee, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [mode, setMode]         = useState('login') // 'login' | 'forgot'
  const [resetSent, setResetSent] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Welcome back!')
      navigate('/admin')
    }
    setLoading(false)
  }

  const handleForgotPassword = async e => {
    e.preventDefault()
    if (!email) {
      toast.error('Enter your admin email first')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })
    setLoading(false)
    if (error) {
      toast.error(error.message)
    } else {
      setResetSent(true)
      toast.success('Password reset link sent! Check your email.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-brownDark flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Coffee size={24} className="text-brand-brownDark" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">KofeeTek Admin</h1>
          <p className="text-white/50 text-xs sm:text-sm">
            {mode === 'login' ? 'Sign in to your dashboard' : 'Reset your password'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@kofeetek.in"
                  className="input-field" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pr-12" required
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-brown/50 hover:text-brand-brown">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setResetSent(false) }}
                    className="text-xs text-brand-gold hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {resetSent ? (
                <div className="text-center py-4">
                  <p className="text-sm text-brand-brown/80 mb-4">
                    If an account exists for <strong>{email}</strong>, a password reset link has been sent. Check your inbox (and spam folder).
                  </p>
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setResetSent(false) }}
                    className="btn-brown w-full justify-center"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <p className="text-xs sm:text-sm text-brand-brown/60 -mt-1 mb-2">
                    Enter the email linked to your admin account. We'll send a secure link to reset your password.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-brand-brown mb-1.5">Email</label>
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="admin@kofeetek.in"
                      className="input-field" required
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center text-xs text-brand-brown/60 hover:text-brand-gold font-medium"
                  >
                    ← Back to Sign In
                  </button>
                </form>
              )}
            </div>
          )}
          <p className="text-center text-xs text-brand-brown/40 mt-5">
            KofeeTek Admin Portal — Authorised access only
          </p>
        </div>
      </div>
    </div>
  )
}
