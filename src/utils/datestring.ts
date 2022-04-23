export const DATE_SEPARATOR = '-';
export const TIME_SEPARATOR = '-';

export const parseString = (date: string, time: string) => {
    const asInt = (part: string) => Number.parseInt(part, 10);
    const [year, month, day] = date.split(DATE_SEPARATOR).map(asInt);
    const [hour, minute] = time.split(TIME_SEPARATOR).map(asInt);

    return new Date(year, month - 1, day, hour, minute);
}

export const parseDate = (date: Date) => {
    return {
        date: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(DATE_SEPARATOR),
        time: [date.getHours(), date.getMinutes()].join(TIME_SEPARATOR),
    }
}
