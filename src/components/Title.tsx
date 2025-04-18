import { Typography } from "@mui/material";

export type TitleProps = {
    title: string,
};

const Title: React.FC<TitleProps> = ({ title }) => (
    <Typography
        variant="h1"
        textAlign="center"
        textOverflow="ellipsis"
        overflow="hidden"
        width="100%"
        sx={{
            fontFamily: '"Sono"',
            fontVariationSettings: '"MONO" 0',
        }}
    >
        {title}
    </Typography>
);

export default Title;
