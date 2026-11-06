import { DinnerEvent, DinnerVote } from '../types';

export const INITIAL_DINNER_EVENTS: DinnerEvent[] = [
  {
    id: 'dinner-current',
    title: '🎉 團隊歡聚食飯 · 慶功晚宴',
    date: '2026-11-20',
    time: '19:30',
    dateTimeIso: '2026-11-20T19:30:00',
    venue: '尖沙咀港威大廈5座 八月花中菜館',
    address: '香港九龍尖沙咀廣東道15號港威大廈商場3樓',
    notes: '感謝各位夥伴辛勤付出！本次聚餐由團隊經費全數贊助，特設私密包廂。敬請大家及早回覆出席意願，以便統計人數及落實訂位菜單！',
    deadline: '2026-11-18T18:00:00',
    createdAt: '2026-11-01T10:00:00Z',
    status: 'active'
  },
  {
    id: 'dinner-past-1',
    title: '🍂 10月中秋大閘蟹聚會',
    date: '2026-10-16',
    time: '19:00',
    dateTimeIso: '2026-10-16T19:00:00',
    venue: '銅鑼灣皇室堡 潮江春',
    address: '香港銅鑼灣告士打道311號皇室堡3樓',
    notes: '季節限定大閘蟹盛宴，共12人出席，圓滿結束！',
    deadline: '2026-10-14T20:00:00',
    createdAt: '2026-10-01T09:00:00Z',
    status: 'archived'
  }
];

export const INITIAL_VOTES: DinnerVote[] = [
  {
    id: 'vote-001',
    eventId: 'dinner-current',
    name: '陳志強 (David)',
    phonePrefix: '+852',
    phone: '91234567',
    status: 'attending',
    headcount: 1,
    notes: '準時到達，期待同大家乾杯！',
    votedAt: '2026-11-02T10:30:00Z'
  },
  {
    id: 'vote-002',
    eventId: 'dinner-current',
    name: '李美欣 (Karen)',
    phonePrefix: '+852',
    phone: '92345678',
    status: 'attending',
    headcount: 1,
    notes: '一定到！需要提早幫手點菜話我知。',
    votedAt: '2026-11-02T11:15:00Z'
  },
  {
    id: 'vote-003',
    eventId: 'dinner-current',
    name: '黃家偉 (Kevin)',
    phonePrefix: '+852',
    phone: '93456789',
    status: 'not_attending',
    headcount: 0,
    notes: '當晚要到外地公幹，好可惜去唔到，祝大家食得開心！',
    votedAt: '2026-11-02T14:20:00Z'
  },
  {
    id: 'vote-004',
    eventId: 'dinner-current',
    name: '何芷晴 (Chloe)',
    phonePrefix: '+852',
    phone: '94567890',
    status: 'attending',
    headcount: 1,
    notes: '出席！',
    votedAt: '2026-11-03T09:00:00Z'
  },
  {
    id: 'vote-005',
    eventId: 'dinner-current',
    name: '張偉倫 (Alan)',
    phonePrefix: '+852',
    phone: '95678901',
    status: 'attending',
    headcount: 2,
    notes: '我同太太一齊出席 (+1)',
    votedAt: '2026-11-03T16:45:00Z'
  },
  {
    id: 'vote-006',
    eventId: 'dinner-current',
    name: '林雅婷 (Grace)',
    phonePrefix: '+852',
    phone: '96789012',
    status: 'attending',
    headcount: 1,
    notes: '可能遲10分鐘到達，唔好等我開飯～',
    votedAt: '2026-11-04T12:10:00Z'
  },
  {
    id: 'vote-007',
    eventId: 'dinner-current',
    name: '郭智朗 (Oscar)',
    phonePrefix: '+852',
    phone: '97890123',
    status: 'not_attending',
    headcount: 0,
    notes: '當日屋企人生日食飯，未能出席，下次一定到！',
    votedAt: '2026-11-04T15:30:00Z'
  },
  {
    id: 'vote-008',
    eventId: 'dinner-current',
    name: '梁淑芬 (Candy)',
    phonePrefix: '+852',
    phone: '98901234',
    status: 'attending',
    headcount: 1,
    notes: '期待相聚！',
    votedAt: '2026-11-05T08:20:00Z'
  },

  // Past event votes
  {
    id: 'vote-past-01',
    eventId: 'dinner-past-1',
    name: '陳志強 (David)',
    phonePrefix: '+852',
    phone: '91234567',
    status: 'attending',
    headcount: 1,
    notes: '蟹肉非常鮮甜！',
    votedAt: '2026-10-02T10:00:00Z'
  },
  {
    id: 'vote-past-02',
    eventId: 'dinner-past-1',
    name: '李美欣 (Karen)',
    phonePrefix: '+852',
    phone: '92345678',
    status: 'attending',
    headcount: 1,
    notes: '',
    votedAt: '2026-10-02T12:00:00Z'
  },
  {
    id: 'vote-past-03',
    eventId: 'dinner-past-1',
    name: '黃家偉 (Kevin)',
    phonePrefix: '+852',
    phone: '93456789',
    status: 'attending',
    headcount: 1,
    notes: '',
    votedAt: '2026-10-03T09:30:00Z'
  }
];
