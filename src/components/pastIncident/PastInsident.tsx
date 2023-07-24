import React from "react";
import { Box, Typography } from "@mui/material";
import { eachDayOfInterval, format, parse, parseISO, subDays } from "date-fns";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface StatusItem {
  id: number;
  status: string;
  date: any;
  blocker_title: string;
  blocker_info: {
    resolved: string;
    monitoring: string;
  };
  [key: string]: any;
}
interface RootState {
  serviceData: {
    serviceData: StatusItem[];
    isLoading: boolean;
  };
}
const PastInsident = () => {
  const navigate = useNavigate();
  const { serviceData } = useSelector((store: RootState) => store.serviceData);

  // console.log("past incident", serviceData);

  const startDate = new Date();
  const endDate = subDays(startDate, 15);
  const dates = eachDayOfInterval({ start: endDate, end: startDate });

  return (
    <Box>
      <Typography
        sx={{
          color: "#000",
          fontWeight: "600",
          fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
          margin: "3rem 0",
        }}
      >
        Past Incidents
      </Typography>
      <Box>
        {dates.reverse().map((date, index) => {
          const matchingData = serviceData.filter((item) => {
            const itemDate = parse(item.date, "dd-MM-yyyy", new Date());
            return (
              format(itemDate, "dd-MM-yyyy") ===
              format(date, "dd-MM-yyyy")
            );
          });

          return (
            <Box
              key={index * 2}
              sx={{
                //   border: "2px solid red",
                margin: "2rem 0",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  fontWeight: "bold",
                }}
              >
                {/* June 4, 2023 */}
                {format(date, "MMMM d, yyyy")}
              </Typography>
              <Box
                component="hr"
                sx={{
                  width: "100%",
                  height: "2px",
                  color: "#D9D9D9",
                  margin: "1rem 0",
                }}
              ></Box>
              {matchingData.length > 0 ? (
                matchingData.map((data) => {
                  return (
                    <Box key={data.id} sx={{ marginBottom: "1rem" }}>
                      <Typography
                        sx={{
                          color: "#F3AF3C",
                          fontSize: { xs: "1rem", md: "1.7rem" },
                          fontWeight: "600",
                          marginBottom: {
                            md: "0.7rem",
                          },
                        }}
                      >
                        {data.blocker_title}
                      </Typography>
                      <Box
                        sx={{
                          color: "#BDBDBD",
                          fontSize: { xs: "1rem", md: "1.2rem" },
                          lineHeight: "35px",
                        }}
                      >
                        {data.blocker_info ? (
                          <Box>
                            <Typography>
                              <span style={{ color: "#000" }}>
                                {" "}
                                Monitoring:
                              </span>{" "}
                              {data.blocker_info.monitoring}{" "}
                            </Typography>
                            <Typography>
                              <span style={{ color: "#000" }}> Resolved:</span>{" "}
                              {data.blocker_info.resolved}{" "}
                            </Typography>
                          </Box>
                        ) : (
                          "No incidents reported."
                        )}
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography
                  sx={{
                    color: "#BDBDBD",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                  }}
                >
                  No data to display
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
      <Typography
        sx={{
          color: "#608BFB",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/history")}
      >
        <KeyboardBackspaceIcon sx={{ marginRight: "0.5rem" }} /> Incident
        history
      </Typography>
    </Box>
  );
};

export default PastInsident;
