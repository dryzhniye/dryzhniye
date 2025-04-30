import type { Avatar } from '@/shared/lib/types/profileTypes'

export type PublicUser = {
  id: number
  userId?: number
  userName: string
  firstName?: string
  lastName?: string
  city?: string
  country?: string
  region?: string
  dateOfBirth?: string
  aboutMe?: string
  avatars: Avatar[]
  createdAt: string
  isFollowing?: boolean
  isFollowedBy?: boolean
  followingCount?: number
  followersCount?: number
  publicationsCount?: number
}

export type FollowingsResponse<T> = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor: number
  items: T[]
}