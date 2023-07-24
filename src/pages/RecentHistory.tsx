import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate  } from "react-router-dom";
import Uptime from "../components/historyComponent/Uptime";
import Incidents from "../components/historyComponent/Incidents";

const RecentHistory = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [toggleComponent, setToggleComponent] = useState(true);
  return (
    <Box
    // sx={{ padding: { lg: "0 8rem" } }}
    >
      <Box>
        <Box
          sx={{
            borderBottom: "1px solid #D7E4F0",
            display: "flex",
            padding: "1.5rem 0 ",
            marginBottom: { xs: "2rem" },
          }}
        >
          <Box sx={{ padding: "0 2rem 0 2rem " }}>
            <Box
              sx={{
                color: toggleComponent ? "#000" : "#8CA1B6",
                // borderBottom: toggleComponent
                //   ? "4px solid #E97D80"
                //   : "0 solid #E97D80",
                borderRadius: toggleComponent ? "4px" : "0 solid #E97D80",
                //   paddingBottom: "0.2rem",
              }}
              onClick={() => setToggleComponent(true)}
            >
              Uptime
              {toggleComponent && (
                // <hr
                //   style={{ borderRadius: "5px", border: "2px solid #E97D80" }}
                // />
                <Typography
                  component="hr"
                  sx={{
                    width: "100%",
                    height: "3px",
                    backgroundColor: "#E97D80",
                    borderColor: "#E97D80",
                    // margin: "1rem 0",
                    borderRadius: "5px",
                  }}
                ></Typography>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              color: !toggleComponent ? "#000" : "#8CA1B6",
              // borderBottom: !toggleComponent
              //   ? "4px solid #E97D80"
              //   : "0 solid #E97D80",
            }}
            onClick={() => setToggleComponent(false)}
          >
            Incidents
            {!toggleComponent && (
              // <hr
              //   style={{ borderRadius: "5px", border: "2px solid #E97D80" }}
              // />
              <Typography
                component="hr"
                sx={{
                  width: "100%",
                  height: "3px",
                  backgroundColor: "#E97D80",
                  borderColor: "#E97D80",
                  borderRadius: "5px",
                }}
              ></Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box>{toggleComponent ? <Uptime /> : <Incidents />}</Box>
      <Typography
        sx={{
          color: "#608BFB",
          display: "flex",
          alignItems: "center",
          margin: { xs: "3rem 0 2rem 0", sm: "3rem 0 2rem 0", md:"6rem 0 2rem 0" },
          cursor:"pointer"
        }}
        onClick={() => navigate("/")}
      >
        <KeyboardBackspaceIcon sx={{ marginRight: "0.5rem" }} /> Current status
      </Typography>
    </Box>
  );
};

export default RecentHistory;
