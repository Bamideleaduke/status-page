import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import YearlyCalendar from "./YearlyCalendar";
import axios from "axios";

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
interface Props {
  title: string;
  data: StatusItem[];
  [key: string]: any;
}
const StatusBar: React.FC<Props> = ({ title, data }) => {
  const [statusData, setStatusData] = useState<StatusItem[]>([]);
  // console.log("status bar", data);

  useEffect(() => {
    getStatus(title);
  }, [title]);
  const getStatus = async (title: string) => {
    const filteredData = data.filter((item) => item.service_name === title);
    setStatusData(filteredData);
    // try {
    //   const res = await axios.get(
    //     `http://wedsiteIndividualFilter/?service=${title}`
    //   );
    //   // console.log(title, res.data.data);
    //   setStatusData(res.data.data);
    // } catch (error) {
    //   // console.error("Error fetching data:", error);
    //   setStatusData([]);
    // }
  };

  return (
    <Box
      sx={{
        borderBottom: "2px solid #D9D9D9",
        padding: { xs: "2rem 1rem", md: "2rem 2rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.7rem",
        }}
      >
        <Typography>{title}</Typography>
        <Typography sx={{ color: "#65C971" }}>Operational</Typography>
      </Box>
      <YearlyCalendar data={statusData} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "0.7rem",
          color: "#D4D4D4",
        }}
      >
        <Typography
          sx={{
            maxWidth: "max-content",
            fontSize: { xs: "0.7rem", sm: "initial" },
          }}
        >
          90 days ago
        </Typography>
        <Box
          component="hr"
          sx={{
            width: { xs: "20%", md: "30%" },
            height: "2px",
          }}
        ></Box>

        <Typography
          sx={{
            maxWidth: "max-content",
            fontSize: { xs: "0.7rem", sm: "initial" },
          }}
        >
          100.0% uptime
        </Typography>
        <Box
          component="hr"
          sx={{
            width: { xs: "20%", md: "35%" },
            height: "2px",
          }}
        ></Box>
        <Typography
          sx={{
            color: "#65C971",
            maxWidth: "max-content",
            fontSize: { xs: "0.7rem", sm: "initial" },
          }}
        >
          Today
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusBar;
