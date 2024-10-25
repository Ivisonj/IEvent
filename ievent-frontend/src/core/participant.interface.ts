export enum ParticpantStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

export interface Participant {
  id: string
  participantId: string
  participantName: string
  status: ParticpantStatus
  presenceCount: number
  lateCount: number
  absenceCount: number
}
