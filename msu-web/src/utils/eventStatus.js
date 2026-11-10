/**
 * Parses a date value into a Date object set to either start-of-day (00:00:00.000)
 * or end-of-day (23:59:59.999) in local time.
 *
 * @param {string|Date} dateVal
 * @param {boolean} isEndOfDay
 * @returns {Date|null}
 */
const parseDateBoundary = (dateVal, isEndOfDay = false) => {
  if (!dateVal) return null;

  if (dateVal instanceof Date) {
    if (isNaN(dateVal.getTime())) return null;
    const y = dateVal.getFullYear();
    const m = dateVal.getMonth();
    const d = dateVal.getDate();
    return isEndOfDay
      ? new Date(y, m, d, 23, 59, 59, 999)
      : new Date(y, m, d, 0, 0, 0, 0);
  }

  const str = String(dateVal).trim();
  if (/^[a-zA-Z\s]+$/.test(str) && !str.includes('-') && !str.includes('/')) {
    return null;
  }

  const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const y = Number(year);
    const m = Number(month) - 1;
    const d = Number(day);
    return isEndOfDay
      ? new Date(y, m, d, 23, 59, 59, 999)
      : new Date(y, m, d, 0, 0, 0, 0);
  }

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = parsed.getMonth();
    const d = parsed.getDate();
    return isEndOfDay
      ? new Date(y, m, d, 23, 59, 59, 999)
      : new Date(y, m, d, 0, 0, 0, 0);
  }

  return null;
};

/**
 * Helper to determine an event's real-time status based on fromDate & toDate
 * relative to the current local date.
 *
 * Rules:
 * 1. If text date explicitly indicates "Ongoing" / "Current Academic Year", returns 'ongoing'.
 * 2. If toDate (or fromDate) has passed before today, returns 'past'.
 * 3. If fromDate is strictly after today, returns 'upcoming'.
 * 4. If today is between fromDate and toDate (inclusive), returns 'ongoing'.
 * 5. Fallback to event.status or 'upcoming'.
 *
 * @param {Object} event
 * @returns {'upcoming' | 'ongoing' | 'past'}
 */
export const getEffectiveEventStatus = (event) => {
  if (!event) return 'past';

  const rawFrom = event.fromDate || event.date;
  const rawTo = event.toDate || rawFrom;

  const fromStr = String(rawFrom || '').toLowerCase().trim();
  const toStr = String(rawTo || '').toLowerCase().trim();

  // Keyword check for open-ended ongoing initiatives
  if (
    fromStr.includes('ongoing') ||
    toStr.includes('ongoing') ||
    fromStr.includes('academic year') ||
    toStr.includes('academic year')
  ) {
    return 'ongoing';
  }

  const startDate = parseDateBoundary(rawFrom, false);
  const endDate = parseDateBoundary(rawTo, true) || (startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 23, 59, 59, 999) : null);

  // If no parseable date boundary exists, fall back to event.status or 'upcoming'
  if (!startDate && !endDate) {
    const status = (event.status || '').toLowerCase().trim();
    return status || 'upcoming';
  }

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

  // If event ended before today began
  if (endDate && endDate < todayStart) {
    return 'past';
  }

  // If event starts after today ends
  if (startDate && startDate > todayEnd) {
    return 'upcoming';
  }

  // If today falls within the start and end boundaries (inclusive)
  return 'ongoing';
};

/**
 * Parses date for display badges (e.g. Month: "AUG", Day: "14").
 * Avoids UTC timezone conversion shifts.
 *
 * @param {string|Date|Object} dateOrEvent
 * @returns {{ month: string, day: string }}
 */
export const parseDateBadge = (dateOrEvent) => {
  if (!dateOrEvent) return { month: 'TBA', day: '--' };

  const dateVal = typeof dateOrEvent === 'object' && !(dateOrEvent instanceof Date)
    ? (dateOrEvent.fromDate || dateOrEvent.date || dateOrEvent.toDate)
    : dateOrEvent;

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
