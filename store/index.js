import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import contentReducer from './slices/contentSlice'
import approvalReducer from './slices/approvalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    approvals: approvalReducer,
  },
})