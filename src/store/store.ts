import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/store/services/baseApi'
import appSlice from '@/store/slices/appSlice'
import sidebarSlice from '@/store/slices/sidebarSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      app: appSlice,
      sidebar: sidebarSlice,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  })
export const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
