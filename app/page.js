import Link from 'next/link'
import { Tv2, GraduationCap, BookOpen, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        backgroundColor: '#040D12',
        backgroundImage: 'radial-gradient(ellipse at top left, rgba(24,61,61,0.8) 0%, transparent 60%), radial-gradient(circle, rgba(147,177,166,0.06) 1px, transparent 1px)',
        backgroundSize: 'auto, 24px 24px',
      }}
    >
      <div className="max-w-3xl w-full space-y-10">

        {/* Hero */}
        <div className="text-center space-y-3">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-2"
            style={{ backgroundColor: 'rgba(214,189,152,0.12)', border: '1px solid rgba(214,189,152,0.25)' }}
          >
            <Tv2 className="h-7 w-7" style={{ color: '#D6BD98' }} />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: '#E8F5E9' }}>
            Content Broadcasting System
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: '#93B1A6' }}>
            Teachers upload content, principals approve it, and students view it live, all in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Staff login */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: 'rgba(24,61,61,0.55)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(147,177,166,0.2)',
              boxShadow: '0 4px 32px rgba(4,13,18,0.4)',
            }}
          >
            <div className="flex items-center gap-2 font-semibold" style={{ color: '#E8F5E9' }}>
              <GraduationCap className="h-5 w-5" style={{ color: '#D6BD98' }} />
              Staff Login
            </div>
            <p className="text-xs" style={{ color: '#93B1A6' }}>
              Teachers and principals sign in to manage and review content.
            </p>

            <div
              className="space-y-1.5 text-xs rounded-lg p-3"
              style={{ backgroundColor: 'rgba(4,13,18,0.4)', border: '1px solid rgba(147,177,166,0.15)' }}
            >
              <p className="font-medium" style={{ color: '#93B1A6' }}>Demo credentials</p>
              <p style={{ color: '#5C8374' }}>Teacher - teacher@demo.com / teacher123</p>
              <p style={{ color: '#5C8374' }}>Principal - principal@demo.com / principal123</p>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 w-full justify-center text-sm font-semibold py-2.5 rounded-lg transition-colors"
              style={{ backgroundColor: '#D6BD98', color: '#040D12' }}
            >
              Go to Login <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Student live view */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: 'rgba(24,61,61,0.55)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(147,177,166,0.2)',
              boxShadow: '0 4px 32px rgba(4,13,18,0.4)',
            }}
          >
            <div className="flex items-center gap-2 font-semibold" style={{ color: '#E8F5E9' }}>
              <BookOpen className="h-5 w-5" style={{ color: '#4ade80' }} />
              Student Live View
            </div>
            <p className="text-xs" style={{ color: '#93B1A6' }}>
              No login needed. Pick a teacher&apos;s broadcast channel to watch live content.
            </p>

            <div className="space-y-2">
              <Link
                href="/live/teacher-1"
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-all text-sm"
                style={{ border: '1px solid rgba(147,177,166,0.2)', backgroundColor: 'rgba(4,13,18,0.3)' }}
                onMouseEnter={undefined}
              >
                <span>
                  <span className="font-medium" style={{ color: '#E8F5E9' }}>Ajay Saxena</span>
                  <span className="ml-1.5 text-xs" style={{ color: '#5C8374' }}>· teacher-1</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: '#4ade80' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  LIVE
                </span>
              </Link>

              <Link
                href="/live/teacher-2"
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-all text-sm"
                style={{ border: '1px solid rgba(147,177,166,0.2)', backgroundColor: 'rgba(4,13,18,0.3)' }}
              >
                <span>
                  <span className="font-medium" style={{ color: '#E8F5E9' }}>Rashmi Saxena</span>
                  <span className="ml-1.5 text-xs" style={{ color: '#5C8374' }}>· teacher-2</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: '#4ade80' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  LIVE
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
