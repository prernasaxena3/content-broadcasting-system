import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, style, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg px-3 py-2 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        backgroundColor: 'rgba(4,13,18,0.6)',
        border: '1px solid rgba(147,177,166,0.25)',
        color: '#E8F5E9',
        ...style,
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = '#93B1A6'
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(147,177,166,0.12)'
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'rgba(147,177,166,0.25)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      {...props}
    />
  )
}

export { Textarea }
