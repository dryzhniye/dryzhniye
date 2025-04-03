import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppState = {
  status: RequestStatus
  error: string | null
}

const initialState: AppState = {
  status: 'idle',
  error: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatus>) {
      state.status = action.payload
    },
    setAppError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const { setAppStatus, setAppError } = appSlice.actions
export const selectAppStatus = (state: RootState) => state.app.status
export const selectAppError = (state: RootState) => state.app.error

export default appSlice.reducer
