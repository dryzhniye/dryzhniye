import { createSlice } from '@reduxjs/toolkit'

type SidebarState = {
  activeItem: string
}

const initialState: SidebarState = {
  activeItem: 'home',
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: build => ({
    setActiveItem: build.reducer<string>((state, action) => {
      state.activeItem = action.payload
    }),
  }),
  selectors: {
    selectActiveItem: state => state.activeItem,
  },
})

export const { setActiveItem } = sidebarSlice.actions
export const { selectActiveItem } = sidebarSlice.selectors

export default sidebarSlice.reducer