// This function is to convert timestamp to location local time
export function convertTimeToLocalTime(
  timestampInMilliseconds: number,
  timezoneInSeconds: number,
) {
  const date = new Date(0);
  const timestampInSeconds = timestampInMilliseconds / 1000;
  // Add timezoneInSeconds to get the location local time
  date.setUTCSeconds(timestampInSeconds + timezoneInSeconds);
  return date;
}
