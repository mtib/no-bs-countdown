import { get } from "lodash";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { parseDate, parseString } from "../utils/datestring";

export const TITLE_PARAM = 'm';
export const DATE_PARAM = 'd';
export const TIME_PARAM = 't';

export const EXAMPLE_OFFSET_MS = 1000 * 60 * 60 * 24;

const paramOrDefault = (searchParams: URLSearchParams, name: string, initial: string) => {
    const value = searchParams.get(name);
    if (value !== null) {
        return value;
    }
    return initial;
}

const useParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const firstRenderDate = React.useRef(new Date());
    const exampleTime = React.useMemo(() => new Date(firstRenderDate.current.getTime() + EXAMPLE_OFFSET_MS), []);
    const exampleDate = React.useMemo(() => parseDate(exampleTime), [exampleTime]);

    const title = React.useMemo(() => paramOrDefault(searchParams, TITLE_PARAM, 'No Bullshit Countdown'), [searchParams])
    const date = React.useMemo(() => paramOrDefault(searchParams, DATE_PARAM, exampleDate.date), [searchParams, exampleDate.date])
    const time = React.useMemo(() => paramOrDefault(searchParams, TIME_PARAM, exampleDate.time), [searchParams, exampleDate.time])
    const parsedDate = React.useMemo(() => parseString(date, time), [date, time]);

    const params = React.useMemo(() => ({
        title,
        date,
        time,
        parsed: parsedDate,
    }), [title, date, time, parsedDate])

    React.useEffect(() => {
        let dirty = false;
        [
            { param: TITLE_PARAM, initial: title },
            { param: DATE_PARAM, initial: date },
            { param: TIME_PARAM, initial: time },
        ].forEach(({ param, initial }) => {
            const urlValue = searchParams.get(param);
            if (urlValue === null || urlValue !== initial) {
                searchParams.set(param, initial);
                dirty = true;
            }
        })
        if (dirty) {
            setSearchParams(searchParams);
        }
    }, [title, date, time]);


    const setParams: ((updatedParams: Record<'time' | 'date' | 'title', string>) => void) = React.useCallback((updatedParams) => {
        [[TIME_PARAM, 'time'], [DATE_PARAM, 'date'], [TITLE_PARAM, 'title']].forEach(([param, index]) => {
            searchParams.set(param, get(updatedParams, index, params[index]));
        });
        setSearchParams(searchParams);
    }, [params]);

    return [
        params,
        setParams,
    ] as const;
}

export default useParams;
