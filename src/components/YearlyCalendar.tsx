import React from "react";
import { eachDayOfInterval, format, parse, parseISO } from "date-fns";
import { Box, useMediaQuery, Popover, Typography } from "@mui/material";
import { useState } from "react";

interface StatusItem {
  id: number;
  status: string;
  date: string;
  blocker_title: string;
  blocker_info: {
    resolved: string;
    monitoring: string;
  };
  [key: string]: any;
}

const YearlyCalendar: React.FC<{ data: StatusItem[] }> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  // console.log("yearly calender",data)
  // const handlePopoverOpen = (event: React.MouseEvent<HTMLDivElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "gray";
      case "degraded":
        return "orange";
      case "partial outage":
        return "red";
      case "major outage":
        return "darkred";
      default:
        return "red";
      // return "#65C971";
    }
  };
  const isMobile = useMediaQuery("(max-width: 600px)");

  const startDate = new Date();
  isMobile
    ? startDate.setDate(startDate.getDate() - 29)
    : startDate.setDate(startDate.getDate() - 90);

  const endDate = new Date();

  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  // const daysPerQuarter = Math.ceil(dates.length / 4);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [hoverTimeout, setHoverTimeout] = useState<number | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [blockerTitle, setBlockerTitle] = useState<string>("");
  // const [blockerInfo, setBlockerInfo] = useState<string>("");
  const [blockerInfo, setBlockerInfo] = useState<
    { resolved: string; monitoring: string } | undefined
  >(undefined);

  const handleHover = (date: Date, event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedDate(date);
    // setIsModalOpen(true);
    setAnchorEl(event.currentTarget);
    const dateString = format(date, "dd-MM-yyyy");
    // console.log("Hovered date:", dateString);
    // const matchingStatus = data.find((item) => {
    //   // const itemDate = parse(item.date, "dd-MM-yyyy", new Date());
    //   const itemDate = parseISO(item.date);
    //   const formattedItemDate = format(itemDate, "dd-MM-yyyy");
    //   // console.log("Formatted item date:", formattedItemDate);
    //   return formattedItemDate === dateString;
    // });
    const matchingStatus = data.find((item) => {
      const itemDate = parse(item.date, "dd-MM-yyyy", new Date()); 
      const formattedItemDate = format(itemDate, "dd-MM-yyyy"); 
      return formattedItemDate === dateString;
    });
    if (matchingStatus) {
      setBlockerTitle(matchingStatus.blocker_title);
      setBlockerInfo(matchingStatus?.blocker_info);
      //setBlockerInfo(matchingStatus?.blockerInfo);
    } else {
      setBlockerTitle("No data to display");
      setBlockerInfo(undefined);
    }

    // console.log("Matching status:", matchingStatus);
  };

  // const handleClose = () => {
  //   setSelectedDate(null);
  //   setIsModalOpen(false);
  //   setAnchorEl(null);
  // };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", overflow: "auto" }}>
        {dates.map((date, index) => {
          const dateString = format(date, "dd-MM-yyyy");
          // console.log("date string", dateString);
          // console.log("yearly calendar");
          // const matchingStatus = data.find((item) => {
          //   // console.log("matching data",item.date)
          //   const itemDate = parseISO(item.date);
          //   console.log("item data",item.date)
          //   const formattedItemDate = format(itemDate, "dd-MM-yyyy");

          //   // console.log("formattedItemDate",formattedItemDate)
          //   return formattedItemDate === dateString;
          // });

          const matchingStatus = data.find((item) => {
            const itemDate = parse(item.date, "dd-MM-yyyy", new Date()); 
            const formattedItemDate = format(itemDate, "dd-MM-yyyy"); 
            return formattedItemDate === dateString;
          });

          const statusColor = matchingStatus
            ? getStatusColor(matchingStatus.status)
            : "#65C971";

          const rectWidth = isMobile ? `${100 / 30}%` : `${100 / 90}%`;

          // const quarterIndex = Math.floor(index / daysPerQuarter);

          return (
            <React.Fragment key={index}>
              <Box
                key={index}
                component="div"
                sx={{
                  width: rectWidth,
                  backgroundColor: statusColor,
                  height: "40px",
                  display: "inline-block",
                  margin: "0 2px",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                // onMouseEnter={handleHover}
                onMouseEnter={(e) => handleHover(date, e)}
                // onMouseLeave={handleClose}
              />

              {selectedDate &&
                format(selectedDate, "dd-MM-yyyy") === dateString && (
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    // onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Box
                      sx={{
                        // width: "200px",
                        maxWidth: "400px",
                        // height: "200px",
                        backgroundColor: "white",
                        padding: "1rem",
                      }}
                    >
                      {/* Content of the popover */}
                      {selectedDate ? (
                        <>
                          <span>{format(selectedDate, "dd-MM-yyyy")}</span>
                          <Typography
                            sx={{
                              color: "#F3AF3C",
                              fontWeight: "bold",
                              marginBottom: "0.7rem",
                            }}
                          >
                            {blockerTitle}
                          </Typography>
                          {blockerInfo?.resolved && (
                            <Typography sx={{ color: "#BDBDBD" }}>
                              <span
                                style={{
                                  fontWeight: "500",
                                  color: "#000",
                                  fontSize: "1.2rem",
                                }}
                              >
                                Resolved:
                              </span>{" "}
                              {blockerInfo.resolved}
                            </Typography>
                          )}
                          {blockerInfo?.monitoring && (
                            <Typography
                              sx={{ marginTop: "0.7rem", color: "#BDBDBD" }}
                            >
                              <span
                                style={{ fontWeight: "500", color: "#000" }}
                              >
                                Monitoring:
                              </span>{" "}
                              {blockerInfo.monitoring}
                            </Typography>
                          )}
                        </>
                      ) : (
                        <p>No Data to display</p>
                      )}
                    </Box>
                  </Popover>
                )}
            </React.Fragment>
          );
        })}
      </Box>
    </React.Fragment>
  );
};

export default YearlyCalendar;
