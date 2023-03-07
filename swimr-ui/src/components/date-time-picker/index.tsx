import { DateTimePicker, DateTimePickerProps } from "@mui/lab";

interface CustomDateTimePickerProps extends DateTimePickerProps<Date> {
  renderInput: (params: any) => JSX.Element;
}

const CustomDateTimePicker = (props: CustomDateTimePickerProps) => {
  return <DateTimePicker {...props} />;
};

export default CustomDateTimePicker;
