import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"

const StatsCard = memo(function StatsCard({ title, value, icon: Icon }) {
  return (
    <Card style={{ borderTop: '2px solid rgba(214,189,152,0.25)' }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: '#93B1A6' }}>{title}</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#E8F5E9' }}>{value ?? 0}</p>
          </div>
          {Icon && (
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: 'rgba(214,189,152,0.1)' }}
            >
              <Icon className="h-6 w-6" style={{ color: '#D6BD98' }} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

export default StatsCard
