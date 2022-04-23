import { Typography } from "@mui/material";

export type TitleProps = {
    title: string,
}

const Title: React.FC<TitleProps> = ({ title }) => (
    <Typography
        variant="h1"
        textAlign="center"
    >
        {title}
    </Typography>
);

export default Title;
