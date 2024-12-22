export function convertEpochToLocalTime(
  epochTimeInUTC: number,
  timezoneInSeconds: number,
) {
  const date = new Date(0);
  // Add timezoneInSeconds to get the location local time
  date.setUTCSeconds(epochTimeInUTC + timezoneInSeconds);
  return date;
}
