'use client'

import { createContext, useContext } from 'react'

export const ProfileContext = createContext<any>(null)
export const useProfile = () => useContext(ProfileContext)