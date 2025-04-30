export type MessageType = {
  id: number
  ownerId: number
  receiverId: number
  messageText: string
  status: 'SENT' | 'RECEIVED' | 'READ'
  messageType: string
  createdAt: string
  updatedAt: string
}

export type Notification = {
  eventType?: number
  id: number
  clientId?: string
  message: string
  isRead: boolean
  notifyAt?: string
  createdAt: string
};

export type WsError = {
  error: {
    error: string
    message: string
  }
  message: string
}