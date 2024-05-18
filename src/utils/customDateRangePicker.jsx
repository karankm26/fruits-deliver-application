import moment from "moment";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function CustomDateRangePicker({ dateRange, setDateRange }) {
  const [displayDateRangePicker, setDisplayRangePicker] = useState(false);
  const [customDate, setCustomDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      date: "",
    },
  ]);

  const handleDateRangeChange = (item) => {
    const startDate = moment(item.selection.startDate).format("YYYY-MM-DD");
    const endDate = moment(item.selection.endDate).format("YYYY-MM-DD");
    setCustomDate([
      {
        ...item.selection,
        date: new Date(),
      },
    ]);

    setDateRange({
      ...dateRange,
      Duration_Start: startDate,
      Duration_End: endDate,
    });
  };
  return (
    <div className="dropdown">
      <div
        onClick={() => setDisplayRangePicker(!displayDateRangePicker)}
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="ri-calendar-fill" />
        <input
          className="form-control form-control-sm"
          value={
            dateRange?.Duration_Start &&
            moment(dateRange?.Duration_Start).format("DD/MM/YYYY") +
              " to " +
              moment(dateRange?.Duration_End).format("DD/MM/YYYY")
          }
          placeholder="Select from - Select to"
          readOnly
        />{" "}
      </div>

      <div
        className="dropdown-menu dropdown-menu-end"
        onClick={(e) => e.stopPropagation()}
      >
        <DateRange
          maxDate={new Date()}
          className="card m-0"
          editableDateInputs={true}
          onChange={handleDateRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={customDate}
        />
      </div>
    </div>
  );
}
