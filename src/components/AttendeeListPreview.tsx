import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, Search, MessageSquareQuote } from 'lucide-react';
import { DinnerVote } from '../types';

interface AttendeeListPreviewProps {
  votes: DinnerVote[];
}

export const AttendeeListPreview: React.FC<AttendeeListPreviewProps> = ({ votes }) => {
  const [filter, setFilter] = useState<'all' | 'attending' | 'not_attending'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const attendingVotes = votes.filter((v) => v.status === 'attending');
  const notAttendingVotes = votes.filter((v) => v.status === 'not_attending');

  const filteredVotes = votes.filter((v) => {
    const matchesFilter = filter === 'all' || v.status === filter;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate total headcount
  const totalHeadcount = attendingVotes.reduce((sum, v) => sum + (v.headcount || 1), 0);

  return (
    <section className="py-10 sm:py-14 bg-white/70 dark:bg-slate-900/60 border-t border-amber-200/60 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
              CURRENT RSVPS · 誰會出席？
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              即時同仁出席動向
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              目前共 <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{totalHeadcount} 位</strong> 出席享受聚餐美食！
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
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋同仁名字..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredVotes.map((v) => {
            const isAttending = v.status === 'attending';

            return (
              <div
                key={v.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isAttending
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-800/40'
                    : 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-800/30 opacity-80'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {v.name}
                    </span>
                    {isAttending && v.headcount > 1 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                        連同行共 {v.headcount} 人
                      </span>
                    )}
                  </div>

                  {v.notes && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                      "{v.notes}"
                    </p>
                  )}
                </div>

                <div className="shrink-0">
                  {isAttending ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>出席</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
                      <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span>不出席</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredVotes.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-400">
            暫未有符合篩選條件的同仁投票
          </div>
        )}

      </div>
    </section>
  );
};
