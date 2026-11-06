import { DinnerEvent } from '../types';

export function generateDinnerGoogleCalendarUrl(event: DinnerEvent): string {
  const title = encodeURIComponent(event.title);
  // e.g. "2026-11-20" and "19:30"
  const dateFormatted = event.date.replace(/-/g, '');
  const timeFormatted = event.time.replace(/:/g, '') + '00';
  const startIso = `${dateFormatted}T${timeFormatted}Z`;
  
  // 2 hours duration
  const endHours = String((parseInt(event.time.split(':')[0], 10) + 2) % 24).padStart(2, '0');
  const endIso = `${dateFormatted}T${endHours}${event.time.split(':')[1]}00Z`;

  const location = encodeURIComponent(`${event.venue} ${event.address || ''}`);
  const details = encodeURIComponent(
    `【${event.title}】\n` +
    `時間：${event.date} ${event.time}\n` +
    `地點：${event.venue}\n` +
    (event.notes ? `備註：${event.notes}\n` : '')
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&location=${location}&details=${details}`;
}

export function downloadDinnerIcsFile(event: DinnerEvent): void {
  const dateFormatted = event.date.replace(/-/g, '');
  const timeFormatted = event.time.replace(/:/g, '') + '00';

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dinner Gathering//RSVP App//ZH",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:dinner-gathering-" + event.id + "@" + window.location.hostname,
    "DTSTAMP:20261105T000000Z",
    `DTSTART:${dateFormatted}T${timeFormatted}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.venue} ${event.address || ''}`,
    `DESCRIPTION:${event.title}\\n地點：${event.venue}\\n備註：${event.notes || '歡聚食飯'}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.title.replace(/[\s\/:*?"<>|]/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
