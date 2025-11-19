import { DateTime } from "luxon";

// convert ISO to DateTime in Asia/Kolkata
export function toKolkata(dtIso: string | Date) {
  return DateTime.fromISO(typeof dtIso === "string" ? dtIso : dtIso.toISOString(), { zone: "utc" }).setZone("Asia/Kolkata");
}

// overlap check (end equals start → allowed)
export function isOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  // overlap if aStart < bEnd && bStart < aEnd
  return (aStart < bEnd) && (bStart < aEnd);
}
