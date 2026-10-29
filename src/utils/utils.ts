export const handleDate = (d: Date | string) => {
  const date = new Date(d);
  const hour = date
    .getHours()
    .toString()
    .padStart(2, '0');
  const min = date
    .getMinutes()
    .toString()
    .padStart(2, '0');
  const sec = date
    .getSeconds()
    .toString()
    .padStart(2, '0');
  const weekDay = date.getDay();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  return {
    hour,
    min,
    sec,
    weekDay: weekDays[weekDay],
    day,
    month: months[month],
    year
  };
};
