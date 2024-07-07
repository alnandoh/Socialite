import { format, parseISO } from "date-fns";

export const formatDate = (
  date: string | Date,
  formatString: string = "PP"
): string => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, formatString);
};

export const isDateInPast = (date: Date): boolean => {
  return date < new Date();
};
