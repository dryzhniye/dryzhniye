'use client'

import { createContext, useContext } from 'react'
import type { PublicProfile } from '@/shared/lib/types/profileTypes'

export const ProfileContext = createContext<PublicProfile | null>(null)
export const useProfile = () => useContext(ProfileContext)