import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Coffee, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async e => {
    //   
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("DATA:", data)
    console.log("ERROR:", error)

    if (error) {
      console.log(error)
      toast.error(error.message)
    } else {
      toast.success("Welcome back!")
      navigate("/admin")
    }

    setLoading(false)
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent to your email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-brownDark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Coffee size={26} className="text-brand-brownDark" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">KofeeTek Admin</h1>
          <p className="text-white/50 text-sm">Sign in to your dashboard</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="nisagar.sagegfx@gmail.com"
                className="input-field" required
              />
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pr-12"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-brown/50 hover:text-brand-brown"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-brand-gold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
          </form>
          <p className="text-center text-xs text-brand-brown/40 mt-5">
            KofeeTek Admin Portal — Authorised access only
          </p>
        </div>
      </div>
    </div>
  )
}