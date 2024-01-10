import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

export default function ResponsiveDateTimePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["StaticDateTimePicker"]}>
        <StaticDateTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
