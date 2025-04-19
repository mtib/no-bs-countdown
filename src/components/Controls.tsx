import { Box, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { throttle } from "lodash";
import * as React from "react";
import useParams from "../hooks/useParams";
import { parseDate } from "../utils/datestring";

const Controls: React.FC = () => {
    const [params, setParams] = useParams();

    const [title, setTitle] = React.useState(params.title);
    const [parsedDate, setParsedDate] = React.useState(params.parsed);

    // Optimize with throttle wrapped in useCallback
    const throttledSync = React.useCallback(
        throttle(() => {
            if (
                (!isNaN(parsedDate.getTime()) &&
                    parsedDate.getTime() !== params.parsed.getTime()) ||
                title !== params.title
            ) {
                const { time, date } = parseDate(parsedDate);
                setParams({ time, date, title });
            }
        }, 50, { leading: true, trailing: true }),
        [parsedDate, title, params, setParams]
    );

    const handleTitleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value),
        []
    );

    // Sync params to local state
    React.useEffect(() => {
        setTitle(params.title);
        setParsedDate(params.parsed);
    }, [params]);

    // Trigger throttled sync when inputs change
    React.useEffect(() => {
        throttledSync();
    }, [throttledSync]);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '10px',
                width: '100%',
                paddingX: '20px',
                flexWrap: 'wrap',
                '& > *': {
                    flexGrow: 1,
                },
            }}
        >
            <TextField
                value={title}
                onChange={handleTitleChange}
                label="Title"
                inputProps={{
                    'aria-label': 'Countdown title'
                }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    value={parsedDate}
                    onChange={(date) => date && setParsedDate(date)}
                    label="Date & Time"
                />
            </LocalizationProvider>
        </Box>
    );
};

export default React.memo(Controls);
