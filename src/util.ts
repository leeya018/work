import { Timestamp } from "firebase/firestore";
import { Shift } from "./interfaces/Shift";

import moment from "moment";

export const TITLES = {
  cash: "cash",
  security: "security",
};

const TIME_FORMAT = "DD/MM/YY HH:mm";
export const timeDifferenceDuration = (startDate: Date, endDate: Date) => {
  // Parse the dates using moment

  try {
    console.log(startDate);
    const start = moment(startDate, TIME_FORMAT);

    const end = moment(endDate, TIME_FORMAT);

    // Calculate the difference in milliseconds
    const duration = moment.duration(end.diff(start));

    // Extract hours and minutes

    return duration;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("function - timeDifferenceDuration" + error.message);
    console.log({ startDate, endDate });
  }
};
export const timeDifference = (startDate: Date, endDate: Date) => {
  console.log("timeDifference");
  // Parse the dates using moment
  const duration = timeDifferenceDuration(startDate, endDate);
  if (!duration) throw new Error("duration is not defiend");
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
  try {
    if (!timestamp) throw new Error("timestamp date is not defind");
    const date = timestamp.toDate();

    // Convert Date to moment object and format as YYYY-MM-DD
    return moment(date).format(TIME_FORMAT);
  } catch (error: any) {
    console.log("function - convertTime" + error.message);
  }
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

export const getDbUrl = () => {
  if (process.env.NODE_ENV) {
    return "https://console.firebase.google.com/u/0/project/apartments-invest/firestore";
  }
  return "https://console.firebase.google.com/u/0/project/dating-empire/firestore";
};

export const netlifyUrl = "https://app.netlify.com/sites/work-lee/deploys";
export const githubUrl = "https://github.com/leeya018/work";

const today = new Date();
export const curr_m = today.getMonth() + 1;
export const curr_y = today.getFullYear();

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION;
};

export const calculateShifts = (shifts: Shift[]) => {
  const rate = 35; // Regular hourly wage
  const busPay = 11; // Per-day transportation payment

  let totalWage = 0;
  let totalRegularHours = 0;
  let totalOvertime1Hours = 0; // 125% hours
  let totalOvertime2Hours = 0; // 150% hours

  shifts.forEach((shift) => {
    if (!shift?.finishedAt) return;

    const start = shift.startedAt.toDate();
    const end = shift.finishedAt.toDate();

    const timeDiff = timeDifferenceDuration(start, end);
    if (!timeDiff) throw new Error("time diff is not defiend");
    const durationInHours = timeDiff.asHours();
    const dayOfWeek = start.getDay(); // 0=Sunday, 5=Friday, 6=Saturday

    let regularHours = 0;
    let overtime1Hours = 0;
    let overtime2Hours = 0;
    let shiftWage = 0;

    // --- Friday Shifts ---
    if (dayOfWeek === 5) {
      overtime1Hours = durationInHours; // All Friday hours are paid at 125%
      shiftWage = overtime1Hours * rate * 1.25;
    }

    // --- Saturday Shifts ---
    else if (dayOfWeek === 6) {
      overtime2Hours = durationInHours; // All Saturday hours are paid at 150%
      shiftWage = overtime2Hours * rate * 1.5;
    }

    // --- Regular Weekday Shifts (Sunday to Thursday) ---
    else {
      regularHours = Math.min(durationInHours, 8);
      overtime1Hours = Math.min(Math.max(durationInHours - 8, 0), 2);
      overtime2Hours = Math.max(durationInHours - 10, 0);

      shiftWage =
        regularHours * rate +
        overtime1Hours * rate * 1.25 +
        overtime2Hours * rate * 1.5;
    }

    // Add daily transportation pay (bus)
    shiftWage += busPay;

    // Accumulate total values
    totalRegularHours += regularHours;
    totalOvertime1Hours += overtime1Hours;
    totalOvertime2Hours += overtime2Hours;
    totalWage += shiftWage;
  });

  console.log("Wage calculation complete.");
  console.log({
    totalRegularHours,
    totalOvertime1Hours, // includes Friday hours (125%)
    totalOvertime2Hours, // includes Saturday hours (150%)
    totalWage,
  });

  return {
    totalRegularHours,
    totalOvertime1Hours,
    totalOvertime2Hours,
    totalWage,
  };
};
