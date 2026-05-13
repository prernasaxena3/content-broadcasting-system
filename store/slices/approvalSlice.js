import { createSlice } from '@reduxjs/toolkit'

const approvalSlice = createSlice({
  name: 'approvals',
  initialState: {
    allContent: [],
    loading: false,
    error: null,
    filterStatus: 'all',
    searchQuery: '',
  },
  reducers: {
    setAllContent: (state, action) => { state.allContent = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload },
    setFilterStatus: (state, action) => { state.filterStatus = action.payload },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload },
    updateContentStatus: (state, action) => {
      const { id, status, rejectionReason } = action.payload
      const item = state.allContent.find((c) => c.id === id)
      if (item) {
        item.status = status
        if (rejectionReason) item.rejectionReason = rejectionReason
      }
    },
  },
})

export const {
  setAllContent, setLoading, setError,
  setFilterStatus, setSearchQuery, updateContentStatus,
} = approvalSlice.actions
export default approvalSlice.reducer