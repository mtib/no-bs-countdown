import { Typography } from "@mui/material";
import * as React from "react";

interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{
                fontWeight: 600,
                padding: '0 20px',
                wordBreak: 'break-word',
                maxWidth: '100%',
                textAlign: 'center',
            }}
        >
            {title}
        </Typography>
    );
};

export default React.memo(Title);
