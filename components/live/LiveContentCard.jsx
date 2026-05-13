import { memo } from "react"
import Image from "next/image"
import { Clock, BookOpen, Timer } from "lucide-react"
import { formatDateTime } from "@/utils/helpers"

const LiveContentCard = memo(function LiveContentCard({ item }) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        background: 'rgba(24, 61, 61, 0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(147,177,166,0.2)',
        borderLeft: '3px solid #4ade80',
        borderRadius: '16px',
        boxShadow: '-2px 0 12px rgba(74,222,128,0.12), 0 4px 32px rgba(4,13,18,0.4)',
      }}
    >
      <div className="relative w-full aspect-video" style={{ backgroundColor: '#0d2626' }}>
        <Image
          src={item.fileUrl || 'https://placehold.co/800x450/183D3D/5C8374?text=No+Preview'}
          alt={item.title ?? 'Content preview'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shadow"
          style={{ backgroundColor: 'rgba(248,113,113,0.2)', color: '#f87171', border: '1px solid rgba(248,113,113,0.4)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <h2 className="text-base font-semibold leading-snug line-clamp-2" style={{ color: '#E8F5E9' }}>
          {item.title ?? 'Untitled'}
        </h2>

        {item.description && (
          <p className="text-sm line-clamp-2" style={{ color: '#93B1A6' }}>{item.description}</p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs mt-auto" style={{ color: '#93B1A6' }}>
          {item.subject && (
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" style={{ color: '#D6BD98' }} />
              {item.subject}
            </span>
          )}
          {item.endTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" style={{ color: '#5C8374' }} />
              Until {formatDateTime(item.endTime)}
            </span>
          )}
          {item.rotationDuration && (
            <span className="inline-flex items-center gap-1">
              <Timer className="h-3.5 w-3.5" style={{ color: '#5C8374' }} />
              Rotates every {item.rotationDuration}s
            </span>
          )}
        </div>

        {item.teacherName && (
          <p className="text-xs" style={{ color: '#5C8374' }}>By {item.teacherName}</p>
        )}
      </div>
    </div>
  )
})

export default LiveContentCard
