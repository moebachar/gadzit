// Function to get the current day of the month
export function getCurrentDay() {
  const currentDate = new Date();
  return currentDate.getDate();
}

// Function to get the current month (1-based index)
export function getCurrentMonth() {
  const currentDate = new Date();
  return currentDate.getMonth() + 1;
}

// Function to get the current year
export function getCurrentYear() {
  const currentDate = new Date();
  return currentDate.getFullYear();
}

export function getMonthName(monthNumber) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    const index = monthNumber - 1;
    return monthNames[index];
  } else {
    return "Invalid month number";
  }
}

export function getCalendar(month, year) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();

  // Determine the starting day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;

  // Initialize the calendar table
  const calendar = [];

  let currentDay = 1;

  for (let week = 0; week < 6; week++) {
    calendar[week] = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      if (
        (week === 0 && dayOfWeek < startDayOfWeek) ||
        currentDay > daysInMonth
      ) {
        // Add the previous/next month's day
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevYear = month === 1 ? year - 1 : year;
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;

        if (week === 0) {
          const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
          const day = daysInPrevMonth - (startDayOfWeek - dayOfWeek - 1);
          calendar[week][dayOfWeek] = { month: prevMonth, day: day };
        } else {
          const day = currentDay - daysInMonth;
          calendar[week][dayOfWeek] = { month: nextMonth, day: day };
          currentDay++;
        }
      } else {
        // Add the current month's day
        calendar[week][dayOfWeek] = { month: month, day: currentDay };
        currentDay++;
      }
    }
  }

  return calendar;
}

export function getEvents(calendar, year, data) {
  const events = Array.from({ length: 6 }, () => new Array(7).fill(null));

  data.forEach((event) => {
    const eventYear = new Date(event.date).getFullYear();

    if (eventYear === year) {
      const eventMonth = new Date(event.date).getMonth() + 1;
      const eventDay = new Date(event.date).getDate();

      for (let week = 0; week < 6; week++) {
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          const calendarMonth = calendar[week][dayOfWeek].month;
          const calendarDay = calendar[week][dayOfWeek].day;

          if (calendarMonth === eventMonth && calendarDay === eventDay) {
            if (!events[week][dayOfWeek]) {
              events[week][dayOfWeek] = [];
            }
            events[week][dayOfWeek].push(event);
          }
        }
      }
    }
  });

  return events;
}

export function extractDate(date) {
  const month = date.month() + 1; // Add 1 because Day.js months are zero-based
  const day = date.date();
  const year = date.year();

  // Pad single-digit month and day values with a leading zero if necessary
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Return the formatted date string
  return `${formattedMonth}/${formattedDay}/${year}`;
}

export function extractTime(date) {
  const hours = date.hour().toString().padStart(2, "0");
  const minutes = date.minute().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
