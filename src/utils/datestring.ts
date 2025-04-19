export const DATE_SEPARATOR = '-';
export const TIME_SEPARATOR = '-';

/**
 * Parses date and time strings into a Date object
 * @param date The date string in format YYYY-MM-DD
 * @param time The time string in format HH-MM
 * @returns A Date object representing the parsed date and time
 */
export const parseString = (date: string, time: string): Date => {
    const asInt = (part: string) => Number.parseInt(part, 10);
    const [year, month, day] = date.split(DATE_SEPARATOR).map(asInt);
    const [hour, minute] = time.split(TIME_SEPARATOR).map(asInt);

    return new Date(year, month - 1, day, hour, minute);
};

/**
 * Formats a Date object into date and time strings
 * @param date The Date object to format
 * @returns An object containing date and time strings
 */
export const parseDate = (date: Date): { date: string; time: string; } => {
    // Ensure correct padding for single-digit values
    const pad = (num: number): string => num.toString().padStart(2, '0');

    return {
        date: [
            date.getFullYear(),
            pad(date.getMonth() + 1),
            pad(date.getDate())
        ].join(DATE_SEPARATOR),
        time: [
            pad(date.getHours()),
            pad(date.getMinutes())
        ].join(TIME_SEPARATOR),
    };
};
