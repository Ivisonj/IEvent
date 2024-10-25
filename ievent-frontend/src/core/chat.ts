export enum SenderTypes {
  user = 'user',
  event = 'event',
}

export interface Chat {
  id: string
  eventName: string
  participantName: string
  messages: [
    msg: {
      id: string
      chatId: string
      message: string
      sender: SenderTypes
      sentAt: string | Date
    },
  ]
}
