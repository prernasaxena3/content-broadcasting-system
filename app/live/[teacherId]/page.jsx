'use client'
import { useParams } from 'next/navigation'
import { useLiveContent } from '@/hooks/useLiveContent'
import LiveContentCard from '@/components/live/LiveContentCard'
import { LiveSkeletonLoader } from '@/components/shared/SkeletonLoader'
import EmptyState from '@/components/shared/EmptyState'
import ErrorState from '@/components/shared/ErrorState'
import { Tv2, RefreshCw } from 'lucide-react'
import { mockUsers } from '@/mock/users'
import { ROLES } from '@/utils/constants'

export default function LivePage() {
  const { teacherId } = useParams()
  const { items, loading, error, refetch } = useLiveContent(teacherId)

  const teacher = mockUsers.find(u => u.id === teacherId && u.role === ROLES.TEACHER)

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#040D12',
        backgroundImage: 'radial-gradient(ellipse at top left, rgba(24,61,61,0.8) 0%, transparent 60%), radial-gradient(circle, rgba(147,177,166,0.06) 1px, transparent 1px)',
        backgroundSize: 'auto, 24px 24px',
      }}
    >
      <header
        className="px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: '#040D12', borderBottom: '1px solid rgba(147,177,166,0.15)' }}
      >
        <div className="flex items-center gap-3">
          <Tv2 className="h-6 w-6" style={{ color: '#D6BD98' }} />
          <div>
            <h1 className="text-lg font-bold leading-none" style={{ color: '#D6BD98' }}>
              Live Broadcast
            </h1>
            {teacher && (
              <p className="text-xs mt-0.5" style={{ color: '#93B1A6' }}>{teacher.name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: '#5C8374' }}>
          <RefreshCw className="h-3.5 w-3.5" />
          Auto-refreshes every 30s
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <LiveSkeletonLoader cards={3} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : items.length === 0 ? (
          <EmptyState icon={Tv2} message="No content available right now. Check back soon." />
        ) : (
          <>
            <p className="text-sm mb-6" style={{ color: '#93B1A6' }}>
              {items.length} item{items.length !== 1 ? 's' : ''} currently broadcasting
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => <LiveContentCard key={item.id} item={item} />)}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
