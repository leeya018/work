import { Timestamp } from "firebase/firestore";
import { Veg } from "./interfaces/Veg";

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
  console.log(startDate);
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

export const VEG_CODES: Veg[] = [
  { title: "רוקט", code: "136", correctNum: 0, inputValue: "" },
  { title: "שומר", code: "73", correctNum: 0, inputValue: "" },
  { title: "שום", code: "60", correctNum: 0, inputValue: "" },
  { title: "תפוח עץ", code: "92", correctNum: 0, inputValue: "" },
  { title: "תפוח פינק", code: "96", correctNum: 0, inputValue: "" },
  { title: "אבוקדו", code: "61", correctNum: 0, inputValue: "" },
  { title: "אגס", code: "84", correctNum: 0, inputValue: "" },
  { title: "אפרסק- אפרשזיף", code: "85", correctNum: 0, inputValue: "" },
  { title: "בצל סגול", code: "57", correctNum: 0, inputValue: "" },
  { title: "בצל לבן", code: "56", correctNum: 0, inputValue: "" },
  { title: "מלון", code: "81", correctNum: 0, inputValue: "" },
  { title: "בטטה", code: "59", correctNum: 0, inputValue: "" },
  { title: "גזר", code: "42", correctNum: 0, inputValue: "" },
  { title: "ברוקולי", code: "135", correctNum: 0, inputValue: "" },
  { title: "דלעת", code: "76", correctNum: 0, inputValue: "" },
  { title: "חציל", code: "49", correctNum: 0, inputValue: "" },
  { title: "תפוח אדמה לבן", code: "58", correctNum: 0, inputValue: "" },
  { title: "תפוח אדמה אדום", code: "79", correctNum: 0, inputValue: "" },
  { title: "כרוב לבן", code: "43", correctNum: 0, inputValue: "" },
  { title: "כרוב סגול", code: "44", correctNum: 0, inputValue: "" },
  { title: "כרובית", code: "47", correctNum: 0, inputValue: "" },
  { title: "מלפפון", code: "41", correctNum: 0, inputValue: "" },
  { title: "בננה", code: "100", correctNum: 0, inputValue: "" },
  { title: "ענבים ירוקים", code: "90", correctNum: 0, inputValue: "" },
  { title: "ענבים שחורים", code: "91", correctNum: 0, inputValue: "" },
  { title: "פומלה", code: "108", correctNum: 0, inputValue: "" },
  { title: "גמבה", code: "52", correctNum: 0, inputValue: "" },
  { title: "פלפל חריף", code: "78", correctNum: 0, inputValue: "" },
  { title: "קישוא", code: "50", correctNum: 0, inputValue: "" },
  { title: "אבטיח", code: "80", correctNum: 0, inputValue: "" },
];

export const getDbUrl = () => {
  if (process.env.NODE_ENV) {
    return "https://console.firebase.google.com/u/0/project/apartments-invest/firestore";
  }
  return "https://console.firebase.google.com/u/0/project/dating-empire/firestore";
};
