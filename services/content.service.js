import { mockContent } from '../mock/content'
import { getSchedulingStatus } from '../utils/helpers'

let contentStore = [...mockContent]

export const getMyContent = async (teacherId) => {
  // MOCK - replace with: return (await api.get(`/content?teacherId=${teacherId}`)).data
  await new Promise((r) => setTimeout(r, 600))
  return contentStore.filter((c) => c.teacherId === teacherId)
}

export const getAllContent = async () => {
  // MOCK - replace with: return (await api.get('/content')).data
  await new Promise((r) => setTimeout(r, 600))
  return contentStore
}

export const uploadContent = async (payload) => {
  // MOCK - replace with: return (await api.post('/content', payload)).data
  await new Promise((r) => setTimeout(r, 1000))
  const newItem = {
    id: `c-${Date.now()}`,
    ...payload,
    status: 'pending',
    createdAt: new Date().toISOString(),
    rejectionReason: null,
  }
  contentStore = [newItem, ...contentStore]
  return newItem
}

export const getLiveContent = async (teacherId) => {
  // MOCK - replace with: return (await api.get(`/content/live/${teacherId}`)).data
  await new Promise((r) => setTimeout(r, 600))
  return contentStore.filter(
    (c) =>
      c.teacherId === teacherId &&
      c.status === 'approved' &&
      getSchedulingStatus(c.startTime, c.endTime) === 'active'
  )
}