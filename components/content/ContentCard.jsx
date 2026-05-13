import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import StatusBadge from "@/components/shared/StatusBadge"
import { formatDateTime, getSchedulingStatus } from "@/utils/helpers"
import { Clock, BookOpen, AlertCircle } from "lucide-react"

const statusBorder = {
  approved: {
    borderLeft: '3px solid #4ade80',
    boxShadow: '-2px 0 12px rgba(74,222,128,0.12), 0 4px 32px rgba(4,13,18,0.4)',
  },
  pending: {
    borderLeft: '3px solid #facc15',
    boxShadow: '-2px 0 12px rgba(250,204,21,0.12), 0 4px 32px rgba(4,13,18,0.4)',
  },
  rejected: {
    borderLeft: '3px solid #f87171',
    boxShadow: '-2px 0 12px rgba(248,113,113,0.12), 0 4px 32px rgba(4,13,18,0.4)',
  },
}

const ContentCard = memo(function ContentCard({ item }) {
  if (!item) return null

  const scheduleStatus = getSchedulingStatus(item.startTime, item.endTime)
  const borderStyle = statusBorder[item.status] ?? {}

  return (
    <Card className="overflow-hidden" style={borderStyle}>
      <div className="aspect-video relative" style={{ backgroundColor: '#0d2626' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.fileUrl || "https://placehold.co/800x450/183D3D/5C8374?text=No+Preview"}
          alt={item.title ?? "Content preview"}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = "https://placehold.co/800x450/183D3D/5C8374?text=No+Preview" }}
        />
        <div className="absolute top-2 right-2">
          <StatusBadge status={item.status} />
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold truncate" style={{ color: '#E8F5E9' }}>
          {item.title ?? "Untitled"}
        </h3>

        {item.subject && (
          <div className="flex items-center gap-1 text-sm" style={{ color: '#93B1A6' }}>
            <BookOpen className="h-3.5 w-3.5" />
            <span>{item.subject}</span>
          </div>
        )}

        {(item.startTime || item.endTime) && (
          <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(147,177,166,0.7)' }}>
            <Clock className="h-3 w-3" />
            <span>{formatDateTime(item.startTime)} → {formatDateTime(item.endTime)}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <StatusBadge status={scheduleStatus} />
        </div>

        {item.status === "rejected" && item.rejectionReason && (
          <div
            className="flex gap-1.5 p-2 rounded text-xs mt-1"
            style={{ backgroundColor: 'rgba(248,113,113,0.1)', color: '#f87171' }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{item.rejectionReason}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

export default ContentCard
