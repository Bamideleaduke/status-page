import React from "react";
// import "./App.css";
import { Box } from "@mui/material";
import { LayoutStyle } from "../styles/LayoutStyles";
import TitleComponent from "../components/TitleComponent";
import StatusComponent from "../components/StatusComponent/StatusComponent";
import PastInsident from "../components/pastIncident/PastInsident";

function Home() {
  return (
    <Box sx={{ padding: { md: "0 12rem" } }}>
      <TitleComponent
        title="All Systems Operational"
        sx={LayoutStyle().titleComponentStyle}
      />

      <StatusComponent />

      <PastInsident />
    </Box>
  );
}

export default Home;
