import { createSlice } from '@reduxjs/toolkit'

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppState = {
  status: RequestStatus
  error: string | null
  email: string | null
  isLoggedIn: boolean
}

const initialState: AppState = {
  status: 'idle',
  error: null,
  email: null,
  isLoggedIn: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (build) => ({
    setAppStatus: build.reducer<RequestStatus>((state, action) => {
      state.status = action.payload
    }),
    setAppError: build.reducer<string | null>((state, action) => {
      state.error = action.payload
    }),
    setAppEmail: build.reducer<string | null>((state, action) => {
      state.email = action.payload
    }),
    setIsLoggedIn: build.reducer<boolean>((state, action) => {
      state.isLoggedIn = action.payload
    })
  }),
  selectors: {
    selectAppStatus: state => state.status,
    selectAppError: state => state.error,
    selectAppEmail: state => state.email,
    selectIsLoggedIn: state => state.isLoggedIn
  },
})

export const { setAppStatus, setAppError, setAppEmail, setIsLoggedIn } = appSlice.actions
export const { selectAppEmail, selectAppStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors

export default appSlice.reducer