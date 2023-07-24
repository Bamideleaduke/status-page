import { Box, Typography, SxProps } from "@mui/material";
import React from "react";
interface titleProps {
  title: string;
  sx: SxProps;
}

const TitleComponent = ({ title, sx }: titleProps) => {
  return (
    <Box sx={sx}>
      <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}>
        {title}
      </Typography>
    </Box>
  );
};

export default TitleComponent;
