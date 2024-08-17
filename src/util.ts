import { Timestamp } from "firebase/firestore";

const moment = require("moment");

export const TITLES = {
  cash: "cash",
  security: "security",
};
export const timeDifferenceDuration = (
  startDate: Timestamp,
  endDate: Date | Timestamp
) => {
  // Parse the dates using moment
  const format = "YYYY-MM-DD HH:mm:ss";
  const start = moment(startDate.toDate(), format);
  let end = moment(endDate, format);

  if (endDate instanceof Date) {
    end = moment(endDate, format);
  } else {
    end = moment(endDate.toDate(), format);
  }

  // Calculate the difference in milliseconds
  const duration = moment.duration(end.diff(start));

  // Extract hours and minutes

  return duration;
};
export const timeDifference = (
  startDate: Timestamp,
  endDate: Date | Timestamp
) => {
  // Parse the dates using moment
  const duration = timeDifferenceDuration(startDate, endDate);
  console.log(duration.asHours());
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  // Format as HH:MM
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

export const convertTime = (timestamp: Timestamp) => {
  const date = timestamp.toDate();

  // Convert Date to moment object and format as YYYY-MM-DD
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const YEARS = [{ value: 2024, label: "2024" }];
