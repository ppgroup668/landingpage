export function generateGoogleCalendarUrl(): string {
  const title = encodeURIComponent("PP PASSION · Business Talk 2026 銀保渠道事業發展分享會");
  // 2026-11-20 20:00 - 22:00 HKT (UTC+8 is 12:00 - 14:00 UTC)
  const dates = "20261120T120000Z/20261120T140000Z";
  const location = encodeURIComponent("香港九龍尖沙咀廣東道15號港威大廈5座11樓 BOC Life");
  const details = encodeURIComponent(
    "【PP PASSION 2026 銀保渠道事業發展分享會】\n" +
    "時間：2026年11月20日 (星期五) 20:00 - 22:00\n" +
    "地點：香港九龍尖沙咀廣東道15號港威大廈5座11樓 BOC Life\n" +
    "分享嘉賓：Yue Wong（分行經理 | 8年6年COT）& Cecilia Yik（高級分部經理 | 6年1年TOT/COT/3年MDRT）\n" +
    "備註：請攜帶電子入場券準時出席，現場備有 iPad WiFi 128GB 幸運大抽獎！"
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&location=${location}&details=${details}`;
}

export function downloadIcsFile(ticketNo?: string): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PP PASSION//Business Talk 2026//ZH",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:pp-passion-businesstalk-20261120@" + window.location.hostname,
    "DTSTAMP:20261105T000000Z",
    "DTSTART:20261120T120000Z",
    "DTEND:20261120T140000Z",
    "SUMMARY:PP PASSION · Business Talk 2026 銀保渠道事業發展分享會",
    "LOCATION:香港九龍尖沙咀廣東道15號港威大廈5座11樓 BOC Life",
    `DESCRIPTION:PP PASSION 2026 銀保渠道事業發展分享會\\n入場編號：${ticketNo || "已確認"}\\n時間：2026年11月20日 20:00\\n特邀嘉賓：Yue Wong & Cecilia Yik\\n現場備有 iPad 128GB 抽獎`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "PP_PASSION_Business_Talk_2026.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
