import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-md", className)}
      style={{
        background: 'linear-gradient(90deg, rgba(24,61,61,0.5) 25%, rgba(92,131,116,0.3) 50%, rgba(24,61,61,0.5) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
      {...props}
    />
  )
}

export { Skeleton }
