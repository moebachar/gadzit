import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { extractDate, extractTime } from "./utils";
import Joi from "joi-browser";
import { validate, validate_date } from "../../utils/validation";
import { HOUR_DIFFERENCE, CELLS } from "../../utils/constants";
import dayjs from "dayjs";

//MUI
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const schema = {
  title: Joi.string().min(8).required().label("Title"),
  description: Joi.string().max(200).label("Descreption"),
  type: Joi.string().min(2).required().label("Type"),
  target: Joi.string().min(2).required().label("Target"),
  date: Joi.label("Date"),
  time: Joi.label("Time"),
};

let CELLS_AND = [...CELLS];

CELLS_AND.splice(0, 0, { name: "Bureau", image: "clubLogo" });
CELLS_AND.splice(0, 0, { name: "Everyone", image: "clubLogo" });

function AddEventFormDialog({ open, handleClose }) {
  const [error, setError] = useState(null);
  const { register, handleSubmit, watch } = useForm();
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [type, setType] = useState("");
  const [target, setTarget] = useState("Bureau");

  const onSubmit = async () => {
    const data = {
      title: watch("title"),
      description: watch("description"),
      date: extractDate(date),
      time: extractTime(time),
      type: type,
      target: target,
    };

    const err = validate(data, schema);
    if (!validate_date(extractDate(date), extractTime(time), HOUR_DIFFERENCE))
      err[
        "date"
      ] = `An event should be anounced before ${HOUR_DIFFERENCE} hours at least`;
    setError(err);
    console.log(err);
    if (!err) {
      console.log(data);
      //call backend services
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="body"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
        Add Event
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            error={error ? (error.title ? true : false) : false}
            margin="normal"
            required
            fullWidth
            id="standard-helper-text"
            label="Title"
            autoComplete="Title"
            autoFocus
            {...register("title")}
            helperText={error ? error.title : ""}
          />
          <TextField
            error={error ? (error.description ? true : false) : false}
            helperText={error ? error.description : ""}
            id="outlined-multiline-static-helper-text"
            label="Discreption"
            multiline
            fullWidth
            rows={3}
            {...register("description")}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              inputProps={{ "aria-label": "Without label" }}
              value={type}
              label="Type"
              onChange={(event) => {
                setType(event.target.value);
              }}
              fullWidth
            >
              <MenuItem value={"meeting"}>Meeting</MenuItem>
              <MenuItem value={"competition"}>Competition</MenuItem>
              <MenuItem value={"Event"}>Event</MenuItem>
              <MenuItem value={"course"}>Course</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Target</InputLabel>
            <Select
              inputProps={{ "aria-label": "Without label" }}
              value={target}
              label="Target"
              onChange={(event) => {
                setTarget(event.target.value);
              }}
              fullWidth
            >
              {CELLS_AND.map(({ name, image }, index) => (
                <MenuItem value={name} key={index}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={require(`../../assets/logo/${image}.ico`)}
                    ></Avatar>
                    <span>{name}</span>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "StaticTimePicker"]}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(date) => setDate(date)}
              />
              <DemoItem label="" className="time-picker">
                <StaticTimePicker
                  defaultValue={dayjs("2022-04-17T15:30")}
                  value={time}
                  onChange={(time) => setTime(time)}
                  componentsProps={{
                    actionBar: {
                      // The actions will be the same between desktop and mobile
                      actions: [],
                    },
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          {error && error["date"] && (
            <Alert variant="outlined" severity="error">
              {error["date"]}
            </Alert>
          )}
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEventFormDialog;
