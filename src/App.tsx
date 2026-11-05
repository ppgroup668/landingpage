/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Speakers } from './components/Speakers';
import { WhyBancassurance } from './components/WhyBancassurance';
import { Agenda } from './components/Agenda';
import { LuckyDrawSection } from './components/LuckyDrawSection';
import { RegistrationForm } from './components/RegistrationForm';
import { VenueSection } from './components/VenueSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { TicketModal } from './components/TicketModal';
import { PosterModal } from './components/PosterModal';
import { AdminModal } from './components/AdminModal';
import { CountdownTimer } from './components/CountdownTimer';
import { EVENT_DETAILS, INITIAL_REGISTRATIONS } from './data/initialData';
import { RegistrationTicket } from './types';
import { Ticket, ArrowUp } from 'lucide-react';

const STORAGE_KEY = 'pp_passion_registrations_2026';
const USER_TICKET_KEY = 'pp_passion_my_ticket_2026';

export default function App() {
  const [registrations, setRegistrations] = useState<RegistrationTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_REGISTRATIONS;
  });

  const [activeTicket, setActiveTicket] = useState<RegistrationTicket | null>(null);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [myTicket, setMyTicket] = useState<RegistrationTicket | null>(() => {
    try {
      const saved = localStorage.getItem(USER_TICKET_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Calculate remaining seats
  // Start from totalSeats (50) minus taken
  // e.g. initial 43 taken + any additional user registrations beyond INITIAL_REGISTRATIONS
  const totalSeats = EVENT_DETAILS.totalSeats;
  const initialCount = INITIAL_REGISTRATIONS.length;
  const userAddedCount = Math.max(0, registrations.length - initialCount);
  const totalBooked = Math.min(totalSeats, EVENT_DETAILS.initialTakenSeats + userAddedCount);
  const remainingSeats = Math.max(0, totalSeats - totalBooked);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    } catch {
      // ignore
    }
  }, [registrations]);

  // Scroll listener for top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationSuccess = (newTicket: RegistrationTicket) => {
    const updated = [newTicket, ...registrations];
    setRegistrations(updated);
    setMyTicket(newTicket);
    setActiveTicket(newTicket);
    try {
      localStorage.setItem(USER_TICKET_KEY, JSON.stringify(newTicket));
    } catch {
      // ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Header
        onRegisterClick={scrollToRegister}
        onAdminClick={() => setIsAdminOpen(true)}
        remainingSeats={remainingSeats}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero with live countdown, poster showcase & quota progress */}
        <Hero
          onRegisterClick={scrollToRegister}
          onOpenPoster={() => setIsPosterOpen(true)}
          remainingSeats={remainingSeats}
          totalSeats={totalSeats}
        />

        {/* Keynote Speakers Detail */}
        <Speakers onRegisterClick={scrollToRegister} />

        {/* Why Bancassurance Channel Advantages */}
        <WhyBancassurance onRegisterClick={scrollToRegister} />

        {/* Seminar Timeline & Agenda */}
        <Agenda onRegisterClick={scrollToRegister} />

        {/* Lucky Draw Feature & Simulator */}
        <LuckyDrawSection onRegisterClick={scrollToRegister} />

        {/* Online Registration Form */}
        <RegistrationForm
          onSuccess={handleRegistrationSuccess}
          remainingSeats={remainingSeats}
          totalSeats={totalSeats}
        />

        {/* Venue, Transportation & Map */}
        <VenueSection />

        {/* FAQ Accordion */}
        <FAQSection onRegisterClick={scrollToRegister} />

      </main>

      {/* Quiet Footer */}
      <Footer
        onRegisterClick={scrollToRegister}
        onOpenPoster={() => setIsPosterOpen(true)}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Floating Bottom Bar for Existing Registered Attendees */}
      {myTicket && !activeTicket && (
        <div className="fixed bottom-4 left-4 z-40 animate-bounce">
          <button
            onClick={() => setActiveTicket(myTicket)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-2xl shadow-orange-500/50 border border-orange-400 transition-all cursor-pointer"
          >
            <Ticket className="w-4 h-4" />
            <span>我的電子入場門票 ({myTicket.registrationNo})</span>
          </button>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-xl transition-all cursor-pointer"
          aria-label="回到頁首"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Modals */}
      <TicketModal
        ticket={activeTicket}
        onClose={() => setActiveTicket(null)}
      />

      <PosterModal
        isOpen={isPosterOpen}
        onClose={() => setIsPosterOpen(false)}
        onRegisterClick={scrollToRegister}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        registrations={registrations}
        onSelectTicket={(ticket) => {
          setIsAdminOpen(false);
          setActiveTicket(ticket);
        }}
        totalSeats={totalSeats}
      />

    </div>
  );
}
