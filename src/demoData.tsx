export const data = [
  {
    id: 21,
    date: "06-06-2023",
    blocker_title: "Login issue for users",
    blocker_info: {
      resolved:
        "From 8:32 to 9:06 UTC, a certain percentage of users were having trouble connecting to our service. The issue has been resolved successfully within 30 minutes, and Miro is up and running again. Thank you for bearing with us!",
      monitoring:
        "Monitoring - Some users were facing connectivity issues from 8:32 to 9:06 UTC.  We have implemented a fix for this issue and are currently monitoring the results. We apologize for any inconvenience this may have caused and we appreciate your patience.",
    },
    service_name: "Service 1",
    status: "operational",
  },
  {
    id: 33,
    date: "07-06-2023",
    blocker_title: "Monitoring",
    blocker_info: {
      resolved:
        "From 8:32 to 9:06 UTC, a certain percentage of users were having trouble connecting to our service.",
      monitoring: "Monitoring - Some users were facing connectivity ",
    },
    service_name: "Service 2",
    status: "partial outage",
  },
  {
    id: 13,
    date: "23-07-2023",
    blocker_title: "Registeration issue for  users",
    blocker_info: {
      resolved:
        "From 8:32 to 9:06 UTC, a certain percentage of users were having trouble connecting to our service. The issue has been resolved successfully within 30 minutes, and Miro is up and running again. Thank you for bearing with us!",
      monitoring:
        "Monitoring - Some users were facing connectivity issues from 8:32 to 9:06 UTC.  We have implemented a fix for this issue and are currently monitoring the results. We apologize for any inconvenience this may have caused and we appreciate your patience.",
    },
    service_name: "Service 3",
    status: "degraded",
  },
  {
    id: 13,
    date: "24-07-2023",
    blocker_title: "Request issue for users",
    blocker_info: {
      resolved:
        "The issue has been resolved successfully within 30 minutes, and Miro is up and running again. Thank you for bearing with us!",
      monitoring:
        "We have implemented a fix for this issue and are currently monitoring the results. We apologize for any inconvenience this may have caused and we appreciate your patience.",
    },
    service_name: "Service 4",
    status: "major outage",
  },
];
