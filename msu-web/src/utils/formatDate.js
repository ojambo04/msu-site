/**
 * Formats a date string into DD-MM-YYYY format.
 * If the input is not a valid date (e.g. "Ongoing", "Current Academic Year"),
 * it safely returns the original string.
 *
 * @param {string|Date} dateVal - ISO date string, Date object, or text
 * @returns {string} - Formatted date string (e.g. "22-05-2026")
 */
export const formatDate = (dateVal) => {
  if (!dateVal) return '';

  // If already a Date object
  if (dateVal instanceof Date) {
    if (isNaN(dateVal.getTime())) return '';
    const day = String(dateVal.getDate()).padStart(2, '0');
    const month = String(dateVal.getMonth() + 1).padStart(2, '0');
    const year = dateVal.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const str = String(dateVal).trim();

  // If it's pure non-date text like "Ongoing" or "Current Academic Year"
  if (/^[a-zA-Z\s]+$/.test(str) && !str.includes('-') && !str.includes('/')) {
    return str;
  }

  const parsed = new Date(str);
  if (isNaN(parsed.getTime())) {
    return str;
  }

  const day = String(parsed.getDate()).padStart(2, '0');
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const year = parsed.getFullYear();

  return `${day}-${month}-${year}`;
};

