import { Box, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { throttle } from "lodash";
import * as React from "react";
import useParams from "../hooks/useParams";
import { parseDate } from "../utils/datestring";

const Controls = () => {
    const [params, setParams] = useParams();

    const [title, setTitle] = React.useState(params.title);
    const [parsedDate, setParsedDate] = React.useState(params.parsed);


    const throttledSync = React.useCallback(throttle(() => {
        if (!isNaN(parsedDate.getTime()) && parsedDate.getTime() !== params.parsed.getTime() || title !== params.title) {
            const { time, date } = parseDate(parsedDate)
            setParams({ time, date, title })
        }
    }, 50, { leading: true, trailing: true }), [parsedDate, title])

    const handleTitleChange = React.useCallback((event) => setTitle(event.target.value), []);

    React.useEffect(() => {
        setTitle(params.title);
        setParsedDate(params.parsed);
    }, [params])

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
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    value={parsedDate}
                    onChange={setParsedDate}
                    renderInput={(params) => <TextField {...params} label="Date & Time" />}
                />
            </LocalizationProvider  >
        </Box>
    )
}

export default Controls;
