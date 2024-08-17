import { Timestamp } from "firebase/firestore";

const moment = require("moment");

export const TITLES = {
  cash: "cash",
  security: "security",
};

export const timeDifference = (
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
