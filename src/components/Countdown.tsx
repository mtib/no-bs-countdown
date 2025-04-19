import { Box } from "@mui/material";
import * as React from "react";
import useParams from "../hooks/useParams";
import Controls from "./Controls";
import Time from "./Time";
import Title from "./Title";

const Countdown: React.FC = () => {
    const [params] = useParams();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh',
                paddingY: '20px',
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
            }}
        >
            <Title title={params.title} />
            <Time target={params.parsed} />
            <Controls />
        </Box>
    );
};

export default React.memo(Countdown);
