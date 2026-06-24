import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import {
  LayoutDashboard, Users, LogOut, Menu, X, Coffee
} from 'lucide-react'

const navItems = [
  { to: '/admin',            label: 'Dashboard',   icon: LayoutDashboard, end: true },
  { to: '/admin/leads',      label: 'Leads',        icon: Users },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-gold rounded-xl flex items-center justify-center">
            <Coffee size={18} className="text-brand-brownDark" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">KofeeTek</div>
            <div className="text-white/40 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300
                     hover:bg-red-400/10 rounded-xl text-sm font-medium transition-colors">
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#F4F1EA]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 bg-brand-brownDark flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-brand-brownDark" onClick={e => e.stopPropagation()}>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <button className="lg:hidden p-2 text-gray-500 hover:text-brand-brown" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="font-semibold text-brand-brownDark">KofeeTek Admin</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
              <span className="text-brand-brownDark font-bold text-xs">A</span>
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
