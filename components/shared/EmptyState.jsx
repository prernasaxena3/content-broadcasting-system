import { FileX } from "lucide-react"

export default function EmptyState({ message = "No data found", subtitle, icon: Icon = FileX }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-2">
      <Icon className="h-12 w-12 mb-1" style={{ color: '#5C8374' }} />
      <p className="text-sm font-medium" style={{ color: '#93B1A6' }}>{message}</p>
      {subtitle && <p className="text-xs" style={{ color: '#5C8374' }}>{subtitle}</p>}
    </div>
  )
}
