"use client"
import { memo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StatusBadge from "@/components/shared/StatusBadge"
import RejectModal from "@/components/principal/RejectModal"
import { formatDateTime, getSchedulingStatus } from "@/utils/helpers"
import { BookOpen, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

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

const ApprovalCard = memo(function ApprovalCard({ item, onApprove, onReject }) {
  const [rejectOpen, setRejectOpen] = useState(false)
  const [approving, setApproving] = useState(false)

  if (!item) return null

  const scheduleStatus = getSchedulingStatus(item.startTime, item.endTime)
  const borderStyle = statusBorder[item.status] ?? {}

  const handleApprove = async () => {
    setApproving(true)
    const success = await onApprove(item.id)
    if (success) toast.success(`"${item.title}" approved successfully`)
    else toast.error("Failed to approve content")
    setApproving(false)
  }

  const handleReject = async (reason) => {
    const success = await onReject(item.id, reason)
    if (success) toast.success(`"${item.title}" rejected`)
    else toast.error("Failed to reject content")
  }

  return (
    <>
      <Card className="overflow-hidden" style={borderStyle}>
        <div className="aspect-video relative" style={{ backgroundColor: '#0d2626' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.fileUrl || "https://placehold.co/800x450/183D3D/5C8374?text=No+Preview"}
            alt={item.title ?? "Content preview"}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = "https://placehold.co/800x450/183D3D/5C8374?text=No+Preview" }}
          />
          <div className="absolute top-2 left-2">
            <StatusBadge status={scheduleStatus} />
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold line-clamp-1" style={{ color: '#E8F5E9' }}>
              {item.title ?? "Untitled"}
            </h3>
            <StatusBadge status={item.status} />
          </div>

          <div className="space-y-1.5 text-sm" style={{ color: '#93B1A6' }}>
            {item.subject && (
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                <span>{item.subject}</span>
              </div>
            )}
            {item.teacherName && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 shrink-0" />
                <span>{item.teacherName}</span>
              </div>
            )}
            {(item.startTime || item.endTime) && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">{formatDateTime(item.startTime)} → {formatDateTime(item.endTime)}</span>
              </div>
            )}
          </div>

          {item.description && (
            <p className="text-sm line-clamp-2" style={{ color: '#93B1A6' }}>{item.description}</p>
          )}

          {item.status === "rejected" && item.rejectionReason && (
            <div
              className="flex gap-1.5 p-2 rounded text-xs"
              style={{ backgroundColor: 'rgba(248,113,113,0.1)', color: '#f87171' }}
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{item.rejectionReason}</span>
            </div>
          )}

          {item.status === "pending" && (
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                className="flex-1"
                style={{
                  backgroundColor: 'rgba(74,222,128,0.15)',
                  color: '#4ade80',
                  border: '1px solid rgba(74,222,128,0.35)',
                }}
                onClick={handleApprove}
                disabled={approving}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                {approving ? "Approving…" : "Approve"}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="flex-1"
                onClick={() => setRejectOpen(true)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <RejectModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={handleReject}
        contentTitle={item.title}
      />
    </>
  )
})

export default ApprovalCard
