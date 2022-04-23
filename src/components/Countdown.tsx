import { Box } from "@mui/material";
import useParams from "../hooks/useParams";
import Controls from "./Controls";
import Time from "./Time";
import Title from "./Title";

const Countdown = () => {
    const [params] = useParams();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh',
            }}
        >
            <Title title={params.title} />
            <Time target={params.parsed} />
            <Controls />
        </Box>
    );
};

export default Countdown;
