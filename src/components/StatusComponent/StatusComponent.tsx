import { Box, Typography } from "@mui/material";
import React from "react";
import StatusBar from "../StatusBar";
import { useSelector } from "react-redux";
// import { data as serviceData } from "../../demoData";

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
// interface ServiceDataMap {
//   [service_name: string]: StatusItem[];
// }

const StatusComponent = () => {
  // const { serviceData } = useSelector((store: RootState) => store.serviceData);
  const serviceData = useSelector(
    (state: RootState) => state.serviceData?.serviceData
  );
  // const [data, setData] = useState<ServiceDataMap>({});
  // const [isDataLoaded, setIsDataLoaded] = useState(false);
  // console.log("service data", serviceData);

  return (
    <Box>
      <Box
        sx={{
          margin: {
            xs: "3rem 0",
            sm: "3rem 0",
          },
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontWeight: "600",
            fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
            marginBottom: "0.5rem",
          }}
        >
          About This Site
        </Typography>
        <Typography
          sx={{ color: "#A3A3A3", fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          The status of Craft and all the related services is constantly
          monitored and displayed at this site.
        </Typography>
      </Box>
      <Box sx={{}}>
        <Box sx={{ border: "2px solid #D9D9D9" }}>
          <Box>
            {serviceData.map((dataa: StatusItem, index: number) => {
              //  const dataArray: StatusItem[] = [dataa?.service_name];
              // console.log(data, "data");
              // const request = async () => {
              //   const res = await axios(
              //     `http://bhjjkhjjjkkj.com/?service=${dataa.service_name}`
              //   );
              //   // console.log(dataa.service_name, res.data.data);
              //   setData((prevData) => ({
              //     ...prevData,
              //     [dataa.service_name]: res?.data?.data,
              //   }));
              // };
              // request();

              // console.log("statuscomp", data);
              return (
                <StatusBar
                  key={index}
                  title={dataa.service_name}
                  data={serviceData}
                />
              );
            })}
          </Box>
          {/* <StatusBar title="Micro service 1" />
          <StatusBar title="Micro service 2" />
          <StatusBar title="Micro service 3" /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default StatusComponent;
