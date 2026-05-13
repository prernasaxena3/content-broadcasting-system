'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { rehydrate } from '@/store/slices/authSlice'
import Navbar from '@/components/shared/Navbar'
import { ROLES } from '@/utils/constants'
import { LayoutDashboard, Upload, FileText, CheckSquare, List, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const teacherLinks = [
  { href: '/teacher',            label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/teacher/upload',     label: 'Upload Content', icon: Upload },
  { href: '/teacher/my-content', label: 'My Content',     icon: FileText },
]

const principalLinks = [
  { href: '/principal',             label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/principal/approvals',   label: 'Approvals',   icon: CheckSquare },
  { href: '/principal/all-content', label: 'All Content', icon: List },
]

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, rehydrated, user } = useSelector((state) => state.auth)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => { dispatch(rehydrate()) }, [dispatch])

  useEffect(() => {
    if (!rehydrated) return
    if (!isAuthenticated) { router.replace('/login'); return }
    if (user?.role === ROLES.TEACHER && pathname.startsWith('/principal')) router.replace('/login')
    else if (user?.role === ROLES.PRINCIPAL && pathname.startsWith('/teacher')) router.replace('/login')
  }, [rehydrated, isAuthenticated, user, pathname, router])

  if (!rehydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#040D12' }}>
        <div
          className="h-8 w-8 rounded-full border-4 animate-spin"
          style={{ borderColor: 'rgba(147,177,166,0.2)', borderTopColor: '#D6BD98' }}
        />
      </div>
    )
  }

  const links = user?.role === ROLES.TEACHER ? teacherLinks : principalLinks

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#040D12' }}>
      <Navbar onMenuToggle={() => setSidebarOpen(o => !o)} />

      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 md:hidden"
            style={{ backgroundColor: 'rgba(4,13,18,0.75)' }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            'fixed md:sticky top-16 z-30 md:z-auto h-[calc(100vh-4rem)] w-56 shrink-0 transition-transform duration-200',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          )}
          style={{ backgroundColor: '#040D12', borderRight: '1px solid rgba(147,177,166,0.12)' }}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-2 md:hidden">
            <span className="text-sm font-semibold" style={{ color: '#E8F5E9' }}>Menu</span>
            <button onClick={() => setSidebarOpen(false)} style={{ color: '#93B1A6' }}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="p-4 space-y-1">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={isActive
                    ? { backgroundColor: '#D6BD98', color: '#040D12', fontWeight: 600 }
                    : { color: '#93B1A6' }
                  }
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(147,177,166,0.08)'
                      e.currentTarget.style.color = '#E8F5E9'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#93B1A6'
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
