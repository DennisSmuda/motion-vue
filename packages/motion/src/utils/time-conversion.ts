/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
export const secondsToMilliseconds = (seconds: number) => seconds * 1000

export function millisecondsToSeconds(milliseconds: number) {
  return milliseconds / 1000
}
