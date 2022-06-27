import { get } from "lodash";
import * as React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { parseDate, parseString } from "../utils/datestring";

export const EXAMPLE_OFFSET_MS = 1000 * 60 * 60 * 24;

const useParams = () => {
    const firstRenderDate = React.useRef(new Date());
    const exampleTime = React.useMemo(() => new Date(firstRenderDate.current.getTime() + EXAMPLE_OFFSET_MS), []);
    const exampleDate = React.useMemo(() => parseDate(exampleTime), [exampleTime]);

    const location = useLocation();
    const navigate = useNavigate();
    const locationPath = location.pathname.split('/').slice(1);

    const title = React.useMemo(() => decodeURIComponent(locationPath[0]) || 'No Bullshit Countdown', [locationPath])
    const date = React.useMemo(() => locationPath.slice(1, 4).join('-') || exampleDate.date, [locationPath, exampleDate.date])
    const time = React.useMemo(() => locationPath.slice(4, 7).join('-') || exampleDate.time, [locationPath, exampleDate.time])
    const parsedDate = React.useMemo(() => parseString(date, time), [date, time]);

    React.useEffect(() => {
        navigate(`/${[title, ...date.split('-'), ...time.split('-')].join('/')}`);
    }, [title, date, time])

    const params = React.useMemo(() => ({
        title,
        date,
        time,
        parsed: parsedDate,
    }), [title, date, time, parsedDate])

    const setParams: ((updatedParams: Record<'time' | 'date' | 'title', string>) => void) = React.useCallback((updatedParams) => {
        navigate(`/${[
            updatedParams.title.replace(/\/+/g, ' ') || title,
            ...(updatedParams.date || date).split('-'),
            ...(updatedParams.time || time).split('-'),
        ].join('/')}`);
    }, [navigate]);

    return [
        params,
        setParams,
    ] as const;
}

export default useParams;
