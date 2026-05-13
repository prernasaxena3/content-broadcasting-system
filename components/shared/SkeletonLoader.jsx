import { Skeleton } from "@/components/ui/skeleton"

const glassCard = {
  background: 'rgba(24,61,61,0.55)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(147,177,166,0.2)',
  borderRadius: '12px',
}

export function StatsSkeletonLoader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-6 space-y-3" style={glassCard}>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-12" />
        </div>
      ))}
    </div>
  )
}

export function TableSkeletonLoader({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4" style={glassCard}>
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      ))}
    </div>
  )
}

export function CardSkeletonLoader({ cards = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(cards)].map((_, i) => (
        <div key={i} className="overflow-hidden" style={glassCard}>
          <Skeleton className="w-full aspect-video rounded-none" />
          <div className="p-4 space-y-2.5">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function LiveSkeletonLoader({ cards = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(cards)].map((_, i) => (
        <div key={i} className="overflow-hidden" style={{ ...glassCard, borderRadius: '16px' }}>
          <Skeleton className="w-full aspect-video rounded-none" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
