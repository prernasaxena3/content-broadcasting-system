import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, style, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-lg px-3 py-1 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
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

export { Input }
