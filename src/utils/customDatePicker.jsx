// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// export default function CustomDatePicker({ handleChange, value }) {
//   const [date, setDate] = useState(null);

//   useEffect(() => {
//     if (value) {
//       setDate(dayjs(value, "DD-MM-YYYY"));
//     }
//   }, [value]);
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DesktopDatePicker"]}>
//         <DemoItem>
//           <DesktopDatePicker
//             minDate={dayjs()}
//             value={date}
//             name="event_date"
//             onChange={(e) => {
//               setDate(e);
//               handleChange({
//                 target: {
//                   name: "event_date",
//                   value: dayjs(e).format("DD-MM-YYYY"),
//                 },
//               });
//             }}
//           />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function CustomDatePicker({ handleChange, value, formik }) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (value) {
      setDate(dayjs(value, "DD-MM-YYYY"));
    }
  }, [value]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DesktopDatePicker"]}>
        <DemoItem>
          <DesktopDatePicker
            minDate={dayjs()}
            value={date}
            name="event_date"
            onChange={(e) => {
              setDate(e);
              formik.handleChange({
                target: {
                  name: "event_date",
                  value: dayjs(e).format("DD-MM-YYYY"),
                },
              });
            }}
            slotProps={{
              textField: { id: "event_date", onBlur: formik.handleBlur },
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
