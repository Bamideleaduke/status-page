import React, { useState } from "react";
import {
  format,
  // startOfMonth,
  addMonths,
  isAfter,
  isSameDay,
  parseISO,
  parse,
  // parse,
} from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Box,
  FormControl,
  // FormHelperText,
  Grid,
  // InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  // Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import "../../App.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { getServiceData, setService } from "../../feature/serviceDataSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

// interface Blocker {
//   date: string;
//   blockerTitle: string;
//   blockerInfo: {
//     resolved: string;
//     monitoring: string;
//   };
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
    service: string;
  };
}
const CalendarComponent: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBlocker, setSelectedBlocker] = useState<StatusItem[] | null>(
    null
  );
  const [excludedDate, setExcludedDate] = useState<Date | null>(null);
  const { serviceData, service } = useSelector(
    (store: RootState) => store.serviceData
  );

  const SERVICE_CHOICES = [
    "all",
    "Service 1",
    "Service 2",
    "Service 3",
    "Service 4",
  ];
  type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

  const dispatch: AppDispatch = useDispatch();
  const changeOption = (event: SelectChangeEvent) => {
    const selectedService = event.target.value;
    dispatch(setService(selectedService));
    if (selectedService !== "all") {
      dispatch(getServiceData(selectedService));
    } else {
      dispatch(getServiceData());
    }
    // console.log(serviceData);
  };

  // const handleOpenDialog = (blockers: StatusItem[] | null) => {
  //   setSelectedBlocker(blockers);
  //   setOpenDialog(true);
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePrevClick = () => {
    setSelectedMonth((prevMonth) => addMonths(prevMonth, -3));
  };

  const handleNextClick = () => {
    const nextMonth = addMonths(selectedMonth, 3);
    if (isAfter(nextMonth, new Date())) {
      return;
    }
    setSelectedMonth(nextMonth);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "blue";
      case "degraded":
        return "orange";
      case "partial outage":
        return "red";
      case "major outage":
        return "darkred";
      case "past-tile":
        return "#65C971";
      default:
        return "#65C971";
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const currentDate = new Date();
    const dateString = format(date, "dd-MM-yyyy");

    const statusItem = serviceData.find((item) => {
      const formattedDate = format(
        parse(item.date, "dd-MM-yyyy", new Date()),
        "dd-MM-yyyy"
      );
      return formattedDate === dateString;
    });

    if (statusItem) {
      const color = getStatusColor(statusItem.status);
      // console.log(statusItem.status, color);
      return `react-calendar__tile status-tile ${color}`;
      // `react-calendar__tile status-tile:enabled:hover ${color}`
    }
    if (isAfter(date, currentDate)) {
      return "react-calendar__tile future-tile";
    }
    // return "react-calendar__tile";
    return "default-color ";
  };

  const handleTileClick = (date: Date) => {
    if (
      isAfter(date, new Date()) ||
      (excludedDate && isSameDay(date, excludedDate))
    ) {
      setExcludedDate(null);
    } else {
      const dateString = format(date, "dd-MM-yyyy");
      const blockers = serviceData.filter(
        (item) =>
          format(parse(item.date, "dd-MM-yyyy", new Date()), "dd-MM-yyyy") ===
          dateString
      );
      setSelectedBlocker(blockers);
      setSelectedDate(date);
      setOpenDialog(true);
      setExcludedDate(date);
    }
  };

  // const tileDisabled = ({ date }: { date: Date }) => {
  //   return isAfter(date, new Date());
  // };

  const renderDialogContent = () => {
    if (selectedBlocker && selectedBlocker.length > 0) {
      return (
        <>
          {selectedBlocker.map((blocker: any) => (
            <Box key={blocker.id} sx={{ marginBottom: "0.7rem" }}>
              {/* <DialogContentText>{blocker.date}</DialogContentText> */}
              <DialogContentText
                sx={{
                  color: "#F3AF3C",
                  fontWeight: "bold",
                  marginBottom: "0.4rem",
                }}
              >
                {blocker.blocker_title}
              </DialogContentText>
              <DialogContentText>
                {blocker.blocker_info.resolved}
              </DialogContentText>
              <DialogContentText>
                {blocker.blocker_info.monitoring}
              </DialogContentText>
            </Box>
          ))}
        </>
      );
    } else {
      return <DialogContentText>No data to display</DialogContentText>;
    }
  };

  const formatMonthLabel = (date: Date) => {
    const firstMonth = format(date, "MMMM yyyy");
    // const secondMonth = format(addMonths(date, 1), "MMMM yyyy");
    const thirdMonth = format(addMonths(date, 2), "MMMM yyyy");

    return `${firstMonth} - ${thirdMonth}`;
  };

  const formatShortWeekday = (_: any, date: any) => "";
  // const navigationLabel = () => "";
  return (
    <div>
      <Box
        sx={{
          display: {
            sm: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            marginBottom: "1.5rem",
            flexBasis: "50%",
          }}
        >
          <FormControl
            sx={{
              m: 1,
              width: "300px",
            }}
          >
            <Select
              value={service}
              onChange={changeOption}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "7px 7px",
                },
              }}
            >
              {SERVICE_CHOICES.map((item, index) => {
                return (
                  <MenuItem key={index * 3} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
          </FormControl>
        </Box>

        <Box sx={{ flexBasis: { sm: "40%", md: "35%", lg: "27%" } }}>
          <div
            className="calendar-navigation"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              marginBottom: "2rem",
            }}
          >
            <button
              onClick={handlePrevClick}
              style={{
                backgroundColor: "white",
                border: "1px solid #C6C6C6",
                borderRadius: "3px",
              }}
            >
              <NavigateBeforeIcon
                sx={{
                  paddingTop: "3px",
                  color: "#C6C6C6",
                }}
              />
            </button>
            {/* Left arrow */}
            <div
              className="month-label"
              style={{
                fontSize: "0.9rem",
                paddingTop: "3px",
              }}
            >
              {formatMonthLabel(selectedMonth)}
            </div>
            <button
              onClick={handleNextClick}
              style={{
                backgroundColor: "white",
                border: "1px solid #C6C6C6",
                borderRadius: "3px",
              }}
            >
              <NavigateNextIcon
                sx={{
                  paddingTop: "3px",
                  color: "#C6C6C6",
                }}
              />
            </button>
            {/* Right arrow */}
          </div>
        </Box>
      </Box>

      <Box className="calendar-grid">
        <Grid
          container
          spacing={4}
          sx={{
            alignItems: { sm: "center" },
          }}
        >
          <Grid item sm={6} md={4}>
            <Calendar
              value={selectedMonth}
              tileClassName={tileClassName}
              showNeighboringMonth={false}
              prev2Label={null}
              next2Label={null}
              formatShortWeekday={formatShortWeekday}
              onClickDay={handleTileClick}
              //   navigationLabel={navigationLabel}
            />
          </Grid>
          <Grid item sm={6} md={4}>
            <Calendar
              value={addMonths(selectedMonth, 1)}
              tileClassName={tileClassName}
              showNeighboringMonth={false}
              prev2Label={null}
              next2Label={null}
              formatShortWeekday={formatShortWeekday}
              onClickDay={handleTileClick}
              //   navigationLabel={navigationLabel}
            />
          </Grid>
          <Grid
            item
            sm={12}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: { sm: "300px", md: "initial" } }}>
              <Calendar
                value={addMonths(selectedMonth, 2)}
                tileClassName={tileClassName}
                showNeighboringMonth={false}
                prev2Label={null}
                next2Label={null}
                formatShortWeekday={formatShortWeekday}
                onClickDay={handleTileClick}
                // navigationLabel={navigationLabel}
              />
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                  {selectedDate && format(selectedDate, "dd-MM-yyyy")}
                </DialogTitle>
                {/* <DialogTitle>{selectedBlocker?.date}</DialogTitle> */}
                <DialogContent>{renderDialogContent()}</DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CalendarComponent;
