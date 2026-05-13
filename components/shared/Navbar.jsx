"use client";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, Menu } from "lucide-react";

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();

  return (
    <header
      className="h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40"
      style={{ backgroundColor: '#040D12', borderBottom: '1px solid rgba(147,177,166,0.15)' }}
    >
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: '#93B1A6' }}
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(147,177,166,0.08)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-bold text-lg" style={{ color: '#D6BD98' }}>
          Content Broadcasting
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" style={{ color: '#93B1A6' }} />
          <span className="hidden sm:inline font-medium" style={{ color: '#E8F5E9' }}>{user?.name}</span>
          <span
            className="capitalize px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(214,189,152,0.12)',
              border: '1px solid rgba(214,189,152,0.3)',
              color: '#D6BD98',
            }}
          >
            {user?.role}
          </span>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          style={{ border: '1px solid rgba(147,177,166,0.4)', color: '#93B1A6', backgroundColor: 'transparent' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#D6BD98';
            e.currentTarget.style.color = '#D6BD98';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(147,177,166,0.4)';
            e.currentTarget.style.color = '#93B1A6';
          }}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
