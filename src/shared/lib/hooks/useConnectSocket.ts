import { useCallback, useEffect, useState } from 'react'
import SocketIoApi from '@/shared/api/socketApi'
import { WS_EVENT_PATH } from '@/shared/lib/const/WS_EVENT_PATH'
import type { MessageType, Notification, WsError } from '@/shared/lib/types/wsTypes'
import { useGetNotificationsQuery } from '@/shared/api/notificationsApi'

export const useConnectSocket = () => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [errors, setErrors] = useState<WsError[]>([]);

  const { data: initialNotifications } = useGetNotificationsQuery({})

  useEffect(() => {
    if (initialNotifications?.items) {
      setNotifications(initialNotifications?.items)
    }

    //todo: for sorting by date and filter 1 month ago

    // const now = new Date();
    // const oneMonthFromNow = new Date();
    // oneMonthFromNow.setMonth(now.getMonth() - 1);
    //
    // if (initialNotifications?.items) {
    //   const sortedNotifications = [...initialNotifications?.items]
    //     .filter(item => {
    //     const createdAt = new Date(item.createdAt);
    //     return createdAt >= oneMonthFromNow && createdAt <= now;
    //   })
    //     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    //   setNotifications(sortedNotifications)
    // }
  }, [initialNotifications])



  const handleNewMessage = useCallback((message: MessageType) => {
    setMessages(prev => [...prev, message]);
    console.log('New message received:', message);
    if (message.receiverId !== message.ownerId && message.status === 'SENT') {
      SocketIoApi.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
        acknowledge: {
          message: message,
          receiverId: message.receiverId
        }
      });
    }
  }, []);

  const handleMessageUpdate = (updatedMessage: MessageType) => {
    setMessages(prev => prev.map(msg =>
      msg.id === updatedMessage.id ? updatedMessage : msg
    ));
    console.log('Message updated:', updatedMessage);
  }

  const handleMessageDeleted = (messageId: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    console.log('Message deleted:', messageId);
  }

  const handleNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    console.log('New notification:', notification);
  }

  const handleError = (error: WsError) => {
    setErrors(prev => [...prev, error]);
    console.error('Socket error:', error);
  }


    const connectSocket = () => {
        SocketIoApi.createConnection();

      SocketIoApi.socket?.on(WS_EVENT_PATH.RECEIVE_MESSAGE, handleNewMessage);
      SocketIoApi.socket?.on(WS_EVENT_PATH.MESSAGE_SENT, handleNewMessage);
      SocketIoApi.socket?.on(WS_EVENT_PATH.UPDATE_MESSAGE, handleMessageUpdate);
      SocketIoApi.socket?.on(WS_EVENT_PATH.MESSAGE_DELETED, handleMessageDeleted);
      SocketIoApi.socket?.on(WS_EVENT_PATH.NOTIFICATIONS, handleNotification);
      SocketIoApi.socket?.on(WS_EVENT_PATH.ERROR, handleError);

    }

    useEffect(() => {
        connectSocket();

        return () => {
          SocketIoApi.socket?.off(WS_EVENT_PATH.RECEIVE_MESSAGE, handleNewMessage);
          SocketIoApi.socket?.off(WS_EVENT_PATH.MESSAGE_SENT, handleNewMessage);
          SocketIoApi.socket?.off(WS_EVENT_PATH.UPDATE_MESSAGE, handleMessageUpdate);
          SocketIoApi.socket?.off(WS_EVENT_PATH.MESSAGE_DELETED, handleMessageDeleted);
          SocketIoApi.socket?.off(WS_EVENT_PATH.NOTIFICATIONS, handleNotification);
          SocketIoApi.socket?.off(WS_EVENT_PATH.ERROR, handleError);
            SocketIoApi.disconnect();
        };
    }, []);

    return {
      notifications,
      messages,
      errors,
      sendMessage: (receiverId: number, messageText: string) => {
        SocketIoApi.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
          message: messageText,
          receiverId
        });
      },
      updateMessage: (messageId: number, newText: string) => {
        SocketIoApi.socket?.emit(WS_EVENT_PATH.UPDATE_MESSAGE, {
          id: messageId,
          message: newText
        });
      },
      deleteMessage: (messageId: number) => {
        SocketIoApi.socket?.emit(WS_EVENT_PATH.MESSAGE_DELETED, messageId);
      }
    };
};
