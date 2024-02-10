

export function getTodaysDateFormattedYYYYMMDD(delimiter: string = '-') {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}${delimiter}${month}${delimiter}${day}`;
  return formattedDate;
}


export function getDateFormattedYYYYMMDD(delimiter: string = '-', dateString: string | null = null) {
  let date = new Date();
  if (dateString) {
    date = new Date(dateString);
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}${delimiter}${month}${delimiter}${day}`;
  return formattedDate;
}


export function convertFullStringDateToShortDate(str: string) {
  const date = new Date(str);
  const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

export function getTodaysDate() {
  // Get today's date
  const today = new Date();

  // Format the date as yyyy-mm-dd
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function addYearsToToday(yearOffest: number) {
  // Get today's date
  const today = new Date();

  // Subtract X years from the date
  const prevDate = new Date(today.getFullYear() + yearOffest, today.getMonth(), today.getDate());

  // Format the date as yyyy-mm-dd
  const year = prevDate.getFullYear();
  const month = String(prevDate.getMonth() + 1).padStart(2, '0');
  const day = String(prevDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate; // Example output: "2018-03-24"
}

export function dateAdd(startDateString: string, interval: string, increment: string) {
  const intervalOptions = Object.freeze({
    'year': 'y',
    'month': 'm',
    'day': 'd'
  });

  const incrementor = parseInt(increment);
  if (typeof startDateString !== 'string') return "Start Date Must be String";
  if (!Object.keys(intervalOptions).includes(interval)) return "Bad Interval";
  if (isNaN(incrementor)) return "Bad Increment";
  const startDate = new Date(startDateString);
  if (!interval || !increment) return startDate;
  const newDate = new Date(startDate);

  switch (interval) {
    case 'year':
      newDate.setFullYear(newDate.getFullYear() + incrementor);
      break;
    case 'month':
      newDate.setMonth(newDate.getMonth() + incrementor);
      break;
    case 'day':
      newDate.setDate(newDate.getDate() + incrementor);
      break;
    default:
      console.log('Unknown Increment');
      break;
  }

  return newDate;
}


//Convert mm/dd/yyyy to yyyymmdd
// export function convertDateFormat(dateString: string): string {
//   const parts = dateString.split('/');
//   const year = parts[2];
//   const month = parts[0].padStart(2, '0');
//   const day = parts[1].padStart(2, '0');
//   return `${year}${month}${day}`;
// }



/**
 * Converts a date string in the format "YYYY-MM-DD" to "YYYYMMDD" format.
 * @param {string} date - The date string in "YYYY-MM-DD" format.
 * @returns {string} The date string in "YYYYMMDD" format.
 */
export function convertDateFormat(date: string): string {
  return date.replace(/-/g, '');
}



/**
 * Get the current date as a formatted string in 'YYYY-MM-DD' format.
 *
 * @returns {string} The current date as a formatted string.
 */
export function getCurrentDateAsString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


/**
 * Calculate the end date of a month after adding a specified number of months to a given start date.
 *
 * @param {Date} startDate - The starting date (default: current date).
 * @param {number} monthsToAdd - The number of months to add (default: 0).
 * @returns {Date} The end date of the calculated month.
 */
export function calculateMonthEndDate(startDate = new Date(), monthsToAdd = 0) {
  const endDate = new Date(startDate);

  endDate.setHours(13, 0, 0, 0);

  const newMonth = endDate.getMonth() + monthsToAdd + 1;
  const newYear = endDate.getFullYear() + Math.floor(newMonth / 12);

  endDate.setMonth(newMonth % 12);
  endDate.setDate(0);
  endDate.setFullYear(newYear);

  return endDate;
}

// // Example usage:
// const endDate = calculateMonthEndDate();
// console.log(endDate.toDateString()); // Output: "September 30 2023" (assuming today is September 22, 2023)


/**
 * Calculate the beginning date of a month after adding a specified number of months to a given start date.
 *
 * @param {Date} startDate - The starting date (default: current date).
 * @param {number} monthsToAdd - The number of months to add (default: 0).
 * @returns {Date} The beginning date of the calculated month.
 */
export function calculateMonthBeginDate(startDate = new Date(), monthsToAdd = 0) {
  const beginDate = new Date(startDate);

  // Reset the time to midnight (00:00:00)
  beginDate.setHours(0, 0, 0, 0);

  // Calculate the new month and year after adding months
  const newMonth = beginDate.getMonth() + monthsToAdd;
  const newYear = beginDate.getFullYear() + Math.floor(newMonth / 12);

  beginDate.setMonth(newMonth % 12);
  beginDate.setFullYear(newYear);

  // Set the day to the first day of the calculated month (1)
  beginDate.setDate(1);

  return beginDate;
}



/**
 * Converts a JavaScript Date object or date string to a SQL Server-compatible date string.
 *
 * @param {Date|string} date - The input date as a JavaScript Date object or date string.
 * @returns {string} A string representing the date and time in SQL Server-compatible format ('YYYY-MM-DD HH:MI:SS').
 * @throws {Error} Throws an error if the input date is invalid or cannot be parsed.
 *
 * @example
 * // Using a JavaScript Date object
 * const currentDate = new Date();
 * const sqlDate = toSqlDateTime(currentDate); // Returns a SQL Server-compatible date string
 *
 * // Using a date string
 * const dateStr = '2023-09-27T14:30:00.000Z';
 * const sqlDateFromStr = toSqlDateTime(dateStr); // Returns a SQL Server-compatible date string
 */
export function toSqlDateTime(date?: Date) {
  const formattedDateTime = (date: Date) => date.toISOString().slice(0, 19).replace('T', ' ');
  if (date) { return formattedDateTime(date) };
  return formattedDateTime(new Date())
};











