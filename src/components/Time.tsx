import { Box, Typography } from "@mui/material";
import * as React from "react";

interface TimeComponentProps {
    unit: string;
    value: number;
    pad: number;
}

interface TimeProps {
    target: Date;
}

// Memoized component to prevent unnecessary re-renders
const TimeComponent: React.FC<TimeComponentProps> = React.memo(({ unit, value, pad }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                component="span"
                variant="h1"
                sx={{
                    fontFamily: '"Sono"',
                    fontWeight: 500,
                    fontVariationSettings: '"MONO" 1',
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
});

TimeComponent.displayName = 'TimeComponent';

const Time: React.FC<TimeProps> = ({ target }) => {
    // Use useCallback to optimize the computation function
    const computeDiffMs = React.useCallback(() => {
        return Math.abs(target.getTime() - new Date().getTime());
    }, [target]);

    const [timeDiffMs, setTimeDiffMs] = React.useState(computeDiffMs);
    const intervalIdRef = React.useRef<number | null>(null);

    // Optimize interval to reduce unnecessary renders
    React.useEffect(() => {
        intervalIdRef.current = window.setInterval(() => {
            setTimeDiffMs(computeDiffMs());
        }, 79);

        return () => {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };
    }, [computeDiffMs]);

    // Calculate time units
    const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiffMs % (1000 * 60)) / 1000);
    const millis = Math.floor(timeDiffMs % 1000);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 4,
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
            <TimeComponent unit="d" value={days} pad={2} />
            <TimeComponent unit="h" value={hours} pad={2} />
            <TimeComponent unit="min" value={minutes} pad={2} />
            <TimeComponent unit="s" value={seconds} pad={2} />
            <TimeComponent unit="ms" value={millis} pad={3} />
        </Box>
    );
};

export default React.memo(Time);
