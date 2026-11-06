/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DinnerHeader } from './components/DinnerHeader';
import { DinnerHero } from './components/DinnerHero';
import { DinnerVotingForm } from './components/DinnerVotingForm';
import { AttendeeListPreview } from './components/AttendeeListPreview';
import { AdminBackendModal } from './components/AdminBackendModal';
import { DinnerFooter } from './components/DinnerFooter';
import { INITIAL_DINNER_EVENTS, INITIAL_VOTES } from './data/initialData';
import { DinnerEvent, DinnerVote, AttendanceStatus } from './types';

const EVENTS_STORAGE_KEY = 'dinner_app_events_v1';
const VOTES_STORAGE_KEY = 'dinner_app_votes_v1';
const MY_VOTE_KEY = 'dinner_app_my_vote_v1';

export default function App() {
  // All Dinner Events (Active & Archived)
  const [events, setEvents] = useState<DinnerEvent[]>(() => {
    try {
      const saved = localStorage.getItem(EVENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DINNER_EVENTS;
  });

  // Current Active Event ID
  const [activeEventId, setActiveEventId] = useState<string>(() => {
    return events.find((e) => e.status === 'active')?.id || events[0]?.id || 'dinner-current';
  });

  // All Votes across events
  const [votes, setVotes] = useState<DinnerVote[]>(() => {
    try {
      const saved = localStorage.getItem(VOTES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_VOTES;
  });

  // User's own previous vote
  const [myVote, setMyVote] = useState<DinnerVote | null>(() => {
    try {
      const saved = localStorage.getItem(MY_VOTE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  // Admin Modal Open State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    } catch {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
    } catch {}
  }, [votes]);

  // Current Event Object
  const currentEvent = events.find((e) => e.id === activeEventId) || events[0];

  // Current Event Votes
  const currentEventVotes = votes.filter((v) => v.eventId === currentEvent.id);
  const attendingVotes = currentEventVotes.filter((v) => v.status === 'attending');
  const notAttendingVotes = currentEventVotes.filter((v) => v.status === 'not_attending');
  const totalHeadcount = attendingVotes.reduce((sum, v) => sum + (v.headcount || 1), 0);

  // Handle User Vote Submission
  const handleVoteSubmit = (voteData: Omit<DinnerVote, 'id' | 'votedAt'>) => {
    const existingIndex = votes.findIndex(
      (v) => v.eventId === voteData.eventId && v.phone === voteData.phone
    );

    let updatedVotes: DinnerVote[];
    let newOrUpdatedVote: DinnerVote;

    if (existingIndex >= 0) {
      newOrUpdatedVote = {
        ...votes[existingIndex],
        ...voteData,
        updatedAt: new Date().toISOString()
      };
      updatedVotes = [...votes];
      updatedVotes[existingIndex] = newOrUpdatedVote;
    } else {
      newOrUpdatedVote = {
        id: `vote-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        votedAt: new Date().toISOString(),
        ...voteData
      };
      updatedVotes = [newOrUpdatedVote, ...votes];
    }

    setVotes(updatedVotes);
    setMyVote(newOrUpdatedVote);
    try {
      localStorage.setItem(MY_VOTE_KEY, JSON.stringify(newOrUpdatedVote));
    } catch {}
  };

  // Handle Event Update (Admin edits dinner date/time/venue)
  const handleUpdateEvent = (updated: DinnerEvent) => {
    const updatedEvents = events.map((e) => (e.id === updated.id ? updated : e));
    setEvents(updatedEvents);
  };

  // Handle Archive & Create New Event
  const handleArchiveAndCreateNew = (newEventData: Omit<DinnerEvent, 'id' | 'createdAt' | 'status'>) => {
    const archivedEvents = events.map((e) =>
      e.id === currentEvent.id ? { ...e, status: 'archived' as const } : e
    );

    const newId = `dinner-${Date.now()}`;
    const newEvent: DinnerEvent = {
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'active',
      ...newEventData
    };

    setEvents([newEvent, ...archivedEvents]);
    setActiveEventId(newId);
  };

  // Admin delete vote
  const handleDeleteVote = (voteId: string) => {
    setVotes((prev) => prev.filter((v) => v.id !== voteId));
    if (myVote && myVote.id === voteId) {
      setMyVote(null);
      localStorage.removeItem(MY_VOTE_KEY);
    }
  };

  // Admin manually add vote
  const handleManualAddVote = (voteData: Omit<DinnerVote, 'id' | 'votedAt'>) => {
    const newVote: DinnerVote = {
      id: `vote-${Date.now()}`,
      votedAt: new Date().toISOString(),
      ...voteData
    };
    setVotes((prev) => [newVote, ...prev]);
  };

  // Admin update vote status
  const handleUpdateVoteStatus = (voteId: string, newStatus: AttendanceStatus) => {
    setVotes((prev) =>
      prev.map((v) => (v.id === voteId ? { ...v, status: newStatus } : v))
    );
  };

  const scrollToVote = () => {
    const el = document.getElementById('voting-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Header */}
      <DinnerHeader
        onOpenAdmin={() => setIsAdminOpen(true)}
        attendingCount={totalHeadcount}
      />

      <main className="flex-1">
        {/* Dinner Event Details & Countdown Hero */}
        <DinnerHero
          event={currentEvent}
          attendingHeadcount={totalHeadcount}
          attendingVotesCount={attendingVotes.length}
          notAttendingCount={notAttendingVotes.length}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onScrollToVote={scrollToVote}
        />

        {/* Voting Form (Name, Phone, Attending/Not Attending) */}
        <DinnerVotingForm
          eventId={currentEvent.id}
          onVoteSubmit={handleVoteSubmit}
          myPreviousVote={myVote?.eventId === currentEvent.id ? myVote : null}
        />

        {/* Real-time Attendee List Preview */}
        <AttendeeListPreview votes={currentEventVotes} />
      </main>

      {/* Footer */}
      <DinnerFooter
        onOpenAdmin={() => setIsAdminOpen(true)}
        event={currentEvent}
      />

      {/* Admin Backend Modal (Edit Date / View Records - Password protected 668668) */}
      <AdminBackendModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentEvent={currentEvent}
        allEvents={events}
        votes={votes}
        onUpdateEvent={handleUpdateEvent}
        onArchiveAndCreateNew={handleArchiveAndCreateNew}
        onDeleteVote={handleDeleteVote}
        onManualAddVote={handleManualAddVote}
        onUpdateVoteStatus={handleUpdateVoteStatus}
      />

    </div>
  );
}
