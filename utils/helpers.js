import { STATUS } from './constants'

export const getSchedulingStatus = (startTime, endTime) => {
  const now = Date.now()
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()

  if (now < start) return 'scheduled'
  if (now >= start && now <= end) return 'active'
  return 'expired'
}

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export const getStatusColor = (status) => {
  switch (status) {
    case STATUS.APPROVED: return 'bg-green-100 text-green-700'
    case STATUS.REJECTED: return 'bg-red-100 text-red-700'
    case STATUS.PENDING: return 'bg-yellow-100 text-yellow-700'
    case 'active': return 'bg-green-100 text-green-700'
    case 'scheduled': return 'bg-blue-100 text-blue-700'
    case 'expired': return 'bg-gray-100 text-gray-500'
    default: return 'bg-gray-100 text-gray-500'
  }
}