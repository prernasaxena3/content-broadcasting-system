'use client'
import { useState, useEffect, useCallback, useRef, startTransition } from 'react'
import { getLiveContent } from '@/services/content.service'

const POLL_INTERVAL_MS = 30_000

export function useLiveContent(teacherId) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const intervalRef = useRef(null)

  const fetchContent = useCallback(async () => {
    try {
      setError(null)
      const data = await getLiveContent(teacherId)
      startTransition(() => setItems(data))
    } catch (err) {
      setError(err.message || 'Failed to load live content')
    } finally {
      setLoading(false)
    }
  }, [teacherId])

  useEffect(() => {
    if (!teacherId) return
    startTransition(() => { fetchContent() })
    intervalRef.current = setInterval(fetchContent, POLL_INTERVAL_MS)
    return () => clearInterval(intervalRef.current)
  }, [fetchContent, teacherId])

  return { items, loading, error, refetch: fetchContent }
}
