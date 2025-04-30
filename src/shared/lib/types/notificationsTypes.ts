import type { Notification } from '@/shared/lib/types/wsTypes'
export type GetNotificationsResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Notification[]
}