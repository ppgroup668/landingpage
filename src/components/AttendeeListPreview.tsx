import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, Search, Calendar, Clock, MessageSquareQuote } from 'lucide-react';
import { DinnerVote } from '../types';

interface AttendeeListPreviewProps {
  votes: DinnerVote[];
}

export const AttendeeListPreview: React.FC<AttendeeListPreviewProps> = ({ votes }) => {
  const [filter, setFilter] = useState<'all' | 'attending' | 'not_attending'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const attendingVotes = votes.filter((v) => v.status === 'attending');
  const notAttendingVotes = votes.filter((v) => v.status === 'not_attending');

  // Filter votes first
  const filteredVotes = votes.filter((v) => {
    const matchesFilter = filter === 'all' || v.status === filter;
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.notes && v.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Calculate total headcount
  const totalHeadcount = attendingVotes.reduce((sum, v) => sum + (v.headcount || 1), 0);

  // Group by Registration Date (YYYY-MM-DD)
  const formatFriendlyDateHeader = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00');
      const now = new Date();
      const isToday =
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate();

      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      const isYesterday =
        d.getFullYear() === yesterday.getFullYear() &&
        d.getMonth() === yesterday.getMonth() &&
        d.getDate() === yesterday.getDate();

      const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const dayName = days[d.getDay()];
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const date = d.getDate();

      const relative = isToday ? ' (今日)' : isYesterday ? ' (昨日)' : '';
      return `${year}年${month}月${date}日 ${dayName}${relative}`;
    } catch {
      return dateStr;
    }
  };

  // Group votes by date string
  const groupedVotes = filteredVotes.reduce<Record<string, DinnerVote[]>>((acc, vote) => {
    const dateKey = vote.votedAt ? vote.votedAt.split('T')[0] : '其他日期';
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(vote);
    return acc;
  }, {});

  // Sort dates descending (newest registration date first)
  const sortedDateKeys = Object.keys(groupedVotes).sort((a, b) => b.localeCompare(a));

  return (
    <section className="py-10 sm:py-16 bg-white/80 dark:bg-slate-900/70 border-t border-amber-200/70 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
              CURRENT RSVPS · 報名日誌
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              即時同仁出席動向
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              依報名日期分日排版 · 目前共 <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{totalHeadcount} 位</strong> 確認出席！
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              全部 ({votes.length})
            </button>
            <button
              onClick={() => setFilter('attending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'attending'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              <span>出席</span>
              <span className="font-mono">({attendingVotes.length})</span>
            </button>
            <button
              onClick={() => setFilter('not_attending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'not_attending'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
              }`}
            >
              <span>不出席</span>
              <span className="font-mono">({notAttendingVotes.length})</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋同仁名字或留言備註..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Grouped by Registration Date with Clear Divider Lines */}
        <div className="space-y-8">
          {sortedDateKeys.map((dateKey) => {
            const dayVotes = groupedVotes[dateKey];
            const dayAttendingCount = dayVotes.filter((v) => v.status === 'attending').length;
            const dayNotAttendingCount = dayVotes.filter((v) => v.status === 'not_attending').length;

            return (
              <div key={dateKey} className="space-y-3.5">
                
                {/* 每一日分開一條清楚的分界線與日期標題 */}
                <div className="relative flex items-center">
                  <div className="flex-grow border-t-2 border-amber-300/80 dark:border-slate-700" />
                  
                  <div className="flex-shrink mx-3 sm:mx-4 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-100/90 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {formatFriendlyDateHeader(dateKey)}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      (當日登記 {dayVotes.length} 票：{dayAttendingCount} 出席 / {dayNotAttendingCount} 不出席)
                    </span>
                  </div>

                  <div className="flex-grow border-t-2 border-amber-300/80 dark:border-slate-700" />
                </div>

                {/* Day's Attendee Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {dayVotes.map((v) => {
                    const isAttending = v.status === 'attending';
                    const timeFormatted = v.votedAt
                      ? new Date(v.votedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : '';

                    return (
                      <div
                        key={v.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 shadow-xs ${
                          isAttending
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/90 dark:border-emerald-800/40 hover:border-emerald-300'
                            : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-800/30 opacity-85 hover:border-rose-300'
                        }`}
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {v.name}
                            </span>
                            
                            {isAttending && v.headcount > 1 && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                                攜眷出席 共{v.headcount}人
                              </span>
                            )}

                            {timeFormatted && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                                <Clock className="w-3 h-3" />
                                <span>{timeFormatted}</span>
                              </span>
                            )}
                          </div>

                          {v.notes && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-white/60 dark:bg-slate-900/60 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800">
                              "{v.notes}"
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 pt-0.5">
                          {isAttending ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 shadow-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>出席</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 shadow-xs">
                              <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                              <span>不出席</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedDateKeys.length === 0 && (
          <div className="py-12 text-center text-xs text-slate-400">
            未有找到符合篩選條件的報名投票紀錄
          </div>
        )}

      </div>
    </section>
  );
};
