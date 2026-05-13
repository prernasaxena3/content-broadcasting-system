"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function RejectModal({ open, onClose, onConfirm, contentTitle }) {
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const reset = () => { setReason(""); setError(""); setLoading(false) }

  const handleConfirm = async () => {
    if (!reason.trim()) { setError("Rejection reason is required"); return }
    setLoading(true)
    try {
      await onConfirm(reason.trim())
      reset(); onClose()
    } catch {
      setError("Failed to reject content. Please try again.")
      setLoading(false)
    }
  }

  const handleClose = () => { if (loading) return; reset(); onClose() }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Content</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {contentTitle && (
            <p className="text-sm" style={{ color: '#93B1A6' }}>
              Rejecting:{" "}
              <span className="font-medium" style={{ color: '#E8F5E9' }}>&ldquo;{contentTitle}&rdquo;</span>
            </p>
          )}
          <div className="space-y-1.5">
            <Label>Reason for rejection *</Label>
            <Textarea
              placeholder="Explain why this content is being rejected…"
              rows={4}
              value={reason}
              onChange={e => { setReason(e.target.value); if (error) setError("") }}
              style={error ? { borderColor: '#f87171' } : undefined}
            />
            {error && <p className="text-xs" style={{ color: '#f87171' }}>{error}</p>}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Rejecting…</>
            ) : "Reject Content"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
