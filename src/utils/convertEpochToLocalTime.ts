export function convertEpochToLocalTime(epochTimeInUTC : number, timezoneInSeconds: number ) {
  const currentDate = new Date();
  const userTimezoneOffset = currentDate.getTimezoneOffset() * 60000;
  const date = new Date(0);
  date.setUTCSeconds(epochTimeInUTC + timezoneInSeconds + userTimezoneOffset);
  return date;
}
