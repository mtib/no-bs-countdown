import { Typography } from "@mui/material";

export type TitleProps = {
    title: string,
}

const Title: React.FC<TitleProps> = ({ title }) => (
    <Typography
        variant="h1"
        textAlign="center"
        textOverflow="ellipsis"
        overflow="hidden"
        width="100%"
    >
        {title}
    </Typography>
);

export default Title;
