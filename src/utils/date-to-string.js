export default function dateToString(date) {
  const [day, month, year, time] = new Date(date)
    .toUTCString()
    .slice(5, -7)
    .split(' ');
  return { day, month, year, time };
}
