import { AlertCircle } from "lucide-react"

export default function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <AlertCircle className="h-12 w-12" style={{ color: '#5C8374' }} />
      <p className="text-sm font-medium" style={{ color: '#93B1A6' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
          style={{ border: '1px solid rgba(147,177,166,0.3)', color: '#93B1A6', backgroundColor: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#D6BD98'; e.currentTarget.style.color = '#D6BD98' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(147,177,166,0.3)'; e.currentTarget.style.color = '#93B1A6' }}
        >
          Try Again
        </button>
      )}
    </div>
  )
}
