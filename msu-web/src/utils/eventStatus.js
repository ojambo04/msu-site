/**
 * Helper to determine an event's real-time status based on its scheduled date.
 *
 * Rules:
 * 1. If explicitly marked as 'ongoing' (or date text is "Ongoing" / "Current Academic Year"), returns 'ongoing'.
 * 2. If date has passed (prior to today), returns 'past'.
 * 3. If date is today or in the future, returns 'upcoming'.
 * 4. Fallback to event.status or 'upcoming'.
 *
 * @param {Object} event
 * @returns {'upcoming' | 'ongoing' | 'past'}
 */
export const getEffectiveEventStatus = (event) => {
  if (!event) return 'past';

  const status = (event.status || '').toLowerCase().trim();
  if (status === 'ongoing') return 'ongoing';

  const dateVal = event.date;
  if (!dateVal) return status || 'upcoming';

  const dateStr = String(dateVal).trim();

  // Non-date text like "Ongoing" or "Current Academic Year"
  if (/^[a-zA-Z\s]+$/.test(dateStr) && !dateStr.includes('-') && !dateStr.includes('/')) {
    return 'ongoing';
  }

  // Parse YYYY-MM-DD safely in local time
  let eventDate = null;
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    eventDate = new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999);
  } else {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      eventDate = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 23, 59, 59, 999);
    }
  }

  if (!eventDate || isNaN(eventDate.getTime())) {
    return status || 'upcoming';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If the event day has ended before today, it is past
  if (eventDate < today) {
    return 'past';
  }

  return 'upcoming';
};

/**
 * Parses date for display badges (e.g. Month: "AUG", Day: "14").
 * Avoids UTC timezone conversion shifts.
 *
 * @param {string|Date} dateVal
 * @returns {{ month: string, day: string }}
 */
export const parseDateBadge = (dateVal) => {
  if (!dateVal) return { month: 'TBA', day: '--' };

  const str = String(dateVal).trim();
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, , month, day] = isoMatch;
    const mIdx = Number(month) - 1;
    return {
      month: months[mIdx] || 'TBA',
      day: String(Number(day)),
    };
  }

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return {
      month: months[parsed.getMonth()] || 'TBA',
      day: String(parsed.getDate()),
    };
  }

  // Handle words like "Ongoing"
  if (/ongoing/i.test(str)) {
    return { month: 'LIVE', day: '•' };
  }

  return { month: 'TBA', day: '--' };
};
