// A ujc filename looks like this: `200131_123456_ABC.ujc`,
// in other words, `yymmdd_hhmmss_RANDOM.ujc`.
// This regex extracts the timestamp from the filename.
const timestampRegex =
  // @ts-ignore
  /^(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})/;

export const parseTimestamp = (filename: string): string => {
  const match = timestampRegex.exec(filename);
  if (!match || !match.groups) {
    // If the filename has no timestamp, return the current timestamp.
    return new Date().toISOString();
  }
  const { year, month, day, hour, minute, second } = match.groups;
  const date = new Date(
    `20${year}-${month}-${day}T${hour}:${minute}:${second}Z`,
  );
  return date.toISOString();
};
