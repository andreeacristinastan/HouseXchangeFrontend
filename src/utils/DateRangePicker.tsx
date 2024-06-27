import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./DateRangePicker.css";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const styleBtn = () => ({
  fontSize: "15px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  width: "auto",
  height: "50px",
  marginTop: "20px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: "0 0 2px",

  background: "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const DateRangePicker = (props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const { handleAvailabilities } = props;
  const { showRanges } = props;

  useEffect(() => {
    console.log(dateRange.map((d) => d?.toLocaleDateString()));
    if (!showRanges) {
      setAvailableDates([]);
    }
    // console.log(availableDates.map((m) => m.));
  }, [showRanges]);

  const handleChangeButton = (val) => {
    setDateRange(val);
  };

  const handleAddButtonClick = () => {
    if (dateRange[0] != null && dateRange[1] != null) {
      setAvailableDates((prevAvailableDates) => [
        ...prevAvailableDates,
        `${dateRange[0]?.toLocaleDateString(
          "en-GB"
        )}-${dateRange[1]?.toLocaleDateString("en-GB")}`,
      ]);
      // console.log("Cand adaug un nou range am valorile: ");
      // console.log(dateRange[0].toLocaleDateString());
      // console.log(dateRange[1].toLocaleDateString());

      handleAvailabilities(
        dateRange[0]?.toLocaleDateString("en-GB"),
        dateRange[1]?.toLocaleDateString("en-GB"),
        "add"
      );
    }
    setDateRange([null, null]);
    // setDateRange(val);
  };

  const handleCancelButtonClick = () => {
    setDateRange([null, null]);
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = (available: string) => {
    console.info("You clicked the delete icon.");
    setAvailableDates((prevDates) =>
      prevDates.filter((date) => date !== available)
    );

    const parts = available.split("-");
    console.log("Cand sterg un nou range am valorile: ");
    console.log(parts[0]);
    console.log(parts[1]);
    handleAvailabilities(parts[0], parts[1], "delete");
  };
  return (
    <div className="calendar-component">
      <Calendar
        // onChange={(val) => setDateRange(val)}
        onChange={handleChangeButton}
        value={dateRange}
        selectRange
      />
      <div className="buttons-component">
        <Button
          variant="outlined"
          onClick={() => handleCancelButtonClick()}
          sx={styleBtn()}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleAddButtonClick()}
          sx={styleBtn()}
        >
          Add
        </Button>
      </div>
      {availableDates.length !== 0 &&
        showRanges &&
        availableDates.map((available) => (
          <div key={available}>
            <Chip
              label={available}
              variant="outlined"
              // onClick={handleClick}
              onDelete={() => handleDelete(available)}
              sx={{
                marginTop: "2px",
                maxWidth: "220px",
                color: "#fff",
                fontSize: "15px",
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default DateRangePicker;
