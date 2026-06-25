import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import LeadPopup from './components/home/LeadPopup'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'

const Home        = lazy(() => import('./pages/Home'))
const About       = lazy(() => import('./pages/About'))
const Products    = lazy(() => import('./pages/Products'))
const Consumables = lazy(() => import('./pages/Consumables'))
const Rental      = lazy(() => import('./pages/Rental'))
const Industries  = lazy(() => import('./pages/Industries'))
const Clients     = lazy(() => import('./pages/Clients'))
const Contact     = lazy(() => import('./pages/Contact'))
const Blog        = lazy(() => import('./pages/Blog'))
const BlogPost    = lazy(() => import('./pages/BlogPost'))

const AdminLogin     = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminLeads     = lazy(() => import('./pages/admin/AdminLeads'))
const ResetPassword   = lazy(() => import('./pages/admin/ResetPassword'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-brand-gold/50 text-sm">Loading...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#4A2C1D', color: '#FFF8F0', borderRadius: '12px' },
          success: { iconTheme: { primary: '#F5B800', secondary: '#4A2C1D' } },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index            element={<><Home /><LeadPopup /></>} />
            <Route path="about"       element={<><About /></>} />
            <Route path="products"    element={<><Products /></>} />
            <Route path="consumables" element={<><Consumables /></>} />
            <Route path="rental"      element={<><Rental /></>} />
            <Route path="industries"  element={<><Industries /></>} />
            <Route path="clients"     element={<><Clients /></>} />
            <Route path="contact"     element={<><Contact /></>} />
            <Route path="blog"        element={<><Blog /></>} />
            <Route path="blog/:slug"  element={<><BlogPost /></>} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index              element={<AdminDashboard />} />
            <Route path="leads"       element={<AdminLeads />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
