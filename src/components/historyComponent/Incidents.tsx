import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  eachMonthOfInterval,
  format,
  subMonths,
  addMonths,
  parse,
  isWithinInterval,
  endOfMonth,
  startOfMonth,
  parseISO,
} from "date-fns";
import "react-date-range/dist/styles.css"; // Import the styles
import "react-date-range/dist/theme/default.css"; // Import the theme
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSelector } from "react-redux";

// interface IncidentData {
//   id: number;
//   date: string;
//   blockerTitle: string;
//   blockerInfo:
//     | {
//         resolved: string;
//         monitoring: string;
//       }
//     | {};
// }

// interface MyRange {
//   startDate: Date;
//   endDate: Date;
// }
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
const Incidents: React.FC = () => {
  const { serviceData } = useSelector(
    (store: RootState) => store.serviceData
  );
  

  const currentDate = new Date();
  // const startDate = subMonths(currentDate, 2);
  const endDate = currentDate;
  const [currentMonth, setCurrentMonth] = useState(currentDate);

  const getMonthData = (monthStart: Date, monthEnd: Date) => {
    const monthData = serviceData.filter((item) => {
      // console.log("item", item);
      // console.log("item", item.date);
      // const itemDate = format(parseISO(item.date), "dd-MM-yyyy");
      // const itemDate = parse(item.date, "dd-MM-yyyy", new Date());
      // console.log("itemDate", itemDate);
      const startDate = startOfMonth(monthStart);
      const endDate = endOfMonth(monthEnd);
      return isWithinInterval(parse(item.date, "dd-MM-yyyy", new Date()), { start: startDate, end: endDate });
    });

    monthData.sort((a, b) => {
      const dateA = parse(a.date, "MM-dd-yyyy", new Date());
      const dateB = parse(b.date, "MM-dd-yyyy", new Date());
      return dateB.getTime() - dateA.getTime();
    });

    return monthData;
  };

  const handlePreviousMonths = () => {
    const previousMonth = subMonths(currentMonth, 3);
    setCurrentMonth(previousMonth);
  };

  const handleNextMonths = () => {
    const nextMonth = addMonths(currentMonth, 3);
    if (nextMonth <= endDate) {
      setCurrentMonth(nextMonth);
    }
  };

  const renderMonthData = () => {
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(addMonths(currentMonth, 2));
    const monthRange = eachMonthOfInterval({
      start: startMonth,
      end: endMonth,
    });

    return monthRange.map((month, index) => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const monthData = getMonthData(monthStart, monthEnd);

      return (
        <Box key={index} sx={{ marginBottom: "2rem" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "1rem" }}
          >
            {format(monthStart, "MMMM")}
            {/* - {format(monthEnd, "MMMM yyyy")} */}
          </Typography>
          {monthData.length > 0 ? (
            monthData
              .filter((matchingData) => matchingData.blocker_title !== "")
              .map((matchingData, dateIndex) => (
                <Box key={dateIndex} sx={{ marginBottom: "1rem" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                  >
                    {/* Display itemDate if needed */}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#F3AF3C",
                      fontWeight: "600",
                      marginBottom: "0.7rem",
                    }}
                  >
                    {matchingData.blocker_title}
                  </Typography>
                  <Box sx={{ color: "#BDBDBD" }}>
                    {Object.keys(matchingData.blocker_info).length ? (
                      <Typography sx={{ color: "#BDBDBD" }}>
                        {
                          (
                            matchingData.blocker_info as {
                              resolved: string;
                              monitoring: string;
                            }
                          ).resolved
                        }
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "#BDBDBD" }}>
                        No incidents reported.
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))
          ) : (
            <Typography sx={{ color: "#BDBDBD" }}>
              No data to display
            </Typography>
          )}
        </Box>
      );
    });
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          justifyContent: {
            xs: "center",
          },
        }}
      >
        <Button
          variant="outlined"
          onClick={handlePreviousMonths}
          sx={{
            borderColor: "#C6C6C6",
            ":hover": {
              borderColor: "#C6C6C6",
            },
          }}
        >
          {/* Previous 3 Months */}
          <NavigateBeforeIcon
            sx={{
              color: "#C6C6C6",
              fontSize: "2rem",
              ":hover": {
                color: "#E97D80",
              },
            }}
          />
        </Button>
        <Typography
          variant="h6"
          sx={{
            marginLeft: "1rem",
            marginRight: "1rem",
            fontWeight: "400",
            fontSize: {
              xs: "0.8rem",
            },
          }}
        >
          {format(startOfMonth(currentMonth), "MMMM yyyy")} -{" "}
          {format(endOfMonth(addMonths(currentMonth, 2)), "MMMM yyyy")}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleNextMonths}
          disabled={addMonths(currentMonth, 3) > endDate}
          sx={{
            borderColor: "#C6C6C6",
            ":hover": {
              borderColor: "#C6C6C6",
            },
          }}
        >
          {/* Next 3 Months */}
          <NavigateNextIcon
            sx={{
              color: "#C6C6C6",
              fontSize: "2rem",
              ":hover": {
                color: "#E97D80",
              },
            }}
          />
        </Button>
      </Box>
      {renderMonthData()}
    </Box>
  );
};

export default Incidents;
