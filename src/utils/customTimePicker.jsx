// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

// export default function CustomTimePicker({ handleChange, value }) {
//   const [time, setTime] = useState(value);
//   useEffect(() => {
//     if (value) {
//       setTime(dayjs(value, "HH:mm:ss"));
//     }
//   }, [value]);
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["TimePicker"]}>
//         <DemoItem>
//           <TimePicker
//             viewRenderers={{
//               hours: renderTimeViewClock,
//               minutes: renderTimeViewClock,
//               seconds: renderTimeViewClock,
//             }}
//             value={time}
//             name="start_time"
//             onChange={(e) => {
//               setTime(e);
//               console.log(e, "kkkkk");
//               handleChange({
//                 target: {
//                   name: "start_time",
//                   value: dayjs(e).format("HH:mm:ss"),
//                 },
//               });
//             }}
//           />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

export default function CustomTimePicker({ value, formik }) {
  const [time, setTime] = useState(value);
  useEffect(() => {
    if (value) {
      setTime(dayjs(value, "HH:mm:ss"));
    }
  }, [value]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <DemoItem>
          <TimePicker
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            value={time}
            name="start_time"
            onChange={(e) => {
              setTime(e);
              formik.handleChange({
                target: {
                  name: "start_time",
                  value: dayjs(e).format("HH:mm:ss"),
                },
              });
            }}
            slotProps={{
              textField: { id: "start_time", onBlur: formik.handleBlur },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#ced4da",
                },
                "& fieldset": {
                  borderColor: "#ced4da",
                },
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
