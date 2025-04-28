import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppState = {
  status: RequestStatus
  error: string | null
  email: string | null
  isLoggedIn: boolean
  userId: number | null
}

const initialState: AppState = {
  status: 'idle',
  error: null,
  email: null,
  isLoggedIn: false,
  userId: null
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: build => ({
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
    }),
    setUserId: build.reducer<number | null>((state, action) => {
      state.userId = action.payload
    })
  }),
  selectors: {
    selectAppStatus: state => state.status,
    selectAppError: state => state.error,
    selectAppEmail: state => state.email,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectUserId: state => state.userId
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPending, state => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, state => {
        state.status = 'failed'
      })
  },
})

export const { setAppStatus, setAppError, setAppEmail, setIsLoggedIn, setUserId } = appSlice.actions
export const { selectAppEmail, selectAppStatus, selectAppError, selectIsLoggedIn, selectUserId } =
  appSlice.selectors

export default appSlice.reducer
