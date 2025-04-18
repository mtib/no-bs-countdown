import React from "react";
import { Box, Typography } from "@mui/material";
import { get } from 'lodash';

export type TimeProps = {
    target: Date,
};

export const SECONDS_MS = 1000;
export const MINUTE_MS = SECONDS_MS * 60;
export const HOUR_MS = MINUTE_MS * 60;
export const DAY_MS = HOUR_MS * 24;
export const DIVISORS = [DAY_MS, HOUR_MS, MINUTE_MS, SECONDS_MS, 1] as const;

const TimeComponent: React.FC<{ unit: string, value: number, pad?: number; }> = ({ unit, value, pad = 0 }) => {
    if (value === null) {
        return null;
    }
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '5px',
            }}
        >
            <Typography
                component="span"
                variant="h2"
                sx={{
                    fontFamily: '"Sono"',
                    fontVariationSettings: '"MONO" 1',
                    fontWeight: 500,
                }}
            >
                {value.toString().padStart(pad, '0')}
            </Typography>
            <Typography
                component="span"
                variant="h2"
                sx={{
                    fontFamily: '"Sono"',
                    fontVariationSettings: '"MONO" 0',
                }}
            >
                {unit}
            </Typography>
        </Box>
    );
};

const Time: React.FC<TimeProps> = ({ target }) => {

    const computeDiffMs = React.useCallback(() => {
        return Math.abs(target.getTime() - new Date().getTime());
    }, [target]);

    const [timeDiffMs, setTimeDiffMs] = React.useState(computeDiffMs);
    const intervalId = React.useRef<number | null>();

    React.useEffect(() => {
        intervalId.current = setInterval(() => {
            setTimeDiffMs(computeDiffMs());
        }, 79);
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        };
    }, [computeDiffMs]);

    const [days, hours, minutes, seconds, millis] = React.useMemo(() => {
        const [rawDays, rawHours, rawMinutes, rawSeconds, rawMillis] = DIVISORS.map((divisor, index, divisors) => Math.floor((timeDiffMs % get(divisors, index - 1, Number.MAX_VALUE)) / divisor));
        return [
            rawDays === 0 ? null : rawDays,
            rawDays + rawHours === 0 ? null : rawHours,
            rawDays + rawHours + rawMinutes === 0 ? null : rawMinutes,
            rawDays + rawHours + rawMinutes + rawSeconds === 0 ? null : rawSeconds,
            rawMillis,
        ] as const;
    }, [timeDiffMs]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
            }}
        >
            <TimeComponent unit="days" value={days} pad={3} />
            <TimeComponent unit="h" value={hours} pad={2} />
            <TimeComponent unit="min" value={minutes} pad={2} />
            <TimeComponent unit="s" value={seconds} pad={2} />
            <TimeComponent unit="ms" value={millis} pad={3} />
        </Box>
    );
};

export default Time;
