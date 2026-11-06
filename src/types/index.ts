export type AttendanceStatus = 'attending' | 'not_attending';

export interface DinnerVote {
  id: string;
  name: string;
  phone: string;
  phonePrefix: string;
  status: AttendanceStatus;
  headcount: number; // default 1 (self), or +1, +2
  notes?: string;
  votedAt: string;
  updatedAt?: string;
  eventId: string; // which dinner event this vote belongs to
}

export interface DinnerEvent {
  id: string;
  title: string;
  date: string; // e.g. "2026-11-20"
  time: string; // e.g. "19:30"
  dateTimeIso: string; // e.g. "2026-11-20T19:30:00"
  venue: string; // e.g. "尖沙咀海港城 八月花 中菜館"
  address?: string;
  notes?: string; // e.g. "慶祝團隊業績突破，公司全數贊助！請大家盡早填妥方便訂位！"
  deadline?: string; // e.g. "2026-11-18T18:00:00"
  createdAt: string;
  status: 'active' | 'archived';
}
