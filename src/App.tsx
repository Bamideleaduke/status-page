import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecentHistory from "./pages/RecentHistory";
import { Box } from "@mui/material";
import { LayoutStyle } from "./styles/LayoutStyles";
import Logo from "./assets/craft.png";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getServiceData } from "./feature/serviceDataSlice";

interface statusProp {
  [key: string]: any;
  // Add other properties of your cart item here
}
interface RootState {
  serviceData: {
    serviceData: statusProp[];
    isLoading: boolean;
  };
}
type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getServiceData());
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={LayoutStyle().mainBox}>
      <Box sx={LayoutStyle().imageFlexBox}>
        <Box
          component="img"
          sx={LayoutStyle().logoImageBox}
          src={Logo}
          alt="logo"
        />
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<RecentHistory />} />
      </Routes>
    </Box>
  );
}

export default App;
