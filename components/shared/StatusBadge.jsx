const statusStyles = {
  approved: {
    background: 'rgba(74,222,128,0.2)',
    color: '#86efac',
    border: '1px solid rgba(74,222,128,0.6)',
    fontWeight: 600,
  },
  active: {
    background: 'rgba(74,222,128,0.2)',
    color: '#86efac',
    border: '1px solid rgba(74,222,128,0.6)',
    fontWeight: 600,
  },
  pending: {
    background: 'rgba(250,204,21,0.2)',
    color: '#fde047',
    border: '1px solid rgba(250,204,21,0.6)',
    fontWeight: 600,
  },
  rejected: {
    background: 'rgba(248,113,113,0.2)',
    color: '#fca5a5',
    border: '1px solid rgba(248,113,113,0.6)',
    fontWeight: 600,
  },
  scheduled: {
    background: 'rgba(96,165,250,0.2)',
    color: '#93c5fd',
    border: '1px solid rgba(96,165,250,0.6)',
    fontWeight: 600,
  },
  expired: {
    background: 'rgba(147,177,166,0.15)',
    color: '#cbd5e1',
    border: '1px solid rgba(147,177,166,0.4)',
    fontWeight: 600,
  },
}

export default function StatusBadge({ status }) {
  const style = statusStyles[status] ?? statusStyles.pending
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs capitalize"
      style={style}
    >
      {status}
    </span>
  )
}
