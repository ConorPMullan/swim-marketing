import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  return <div style={{ height: 270, width: 440 }} />;
};

export default MyCalendar;
