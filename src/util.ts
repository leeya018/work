import { Timestamp } from "firebase/firestore";

const moment = require("moment");

export const TITLES = {
  cash: "cash",
  security: "security",
};

export const timeDifference = (startDate: Timestamp, endDate: Date) => {
  // Parse the dates using moment
  const format = "YYYY-MM-DD HH:mm:ss";
  const start = moment(startDate.toDate(), format);
  const end = moment(endDate, format);

  // Calculate the difference in milliseconds
  const duration = moment.duration(end.diff(start));

  // Extract hours and minutes
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  // Format as HH:MM
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};
