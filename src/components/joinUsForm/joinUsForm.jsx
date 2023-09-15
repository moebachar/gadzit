import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { YEARS, CELLS } from "../../utils/constants";
import Joi from "joi-browser";
import { validate } from "../../utils/validation";
import joinUsImage from "../../assets/svg/join-us.svg";
import Button2 from "../commun/button2";
import "./joinUsForm.scss";

//MUI
import { Chip, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MuiTelInput } from "mui-tel-input";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
//Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Alert1 = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = {
  fullName: Joi.string().min(4).max(32).required().label("Full Name"),
  email: Joi.string().email().required().label("Email Adress"),
  phone: Joi.string()
    .regex(/^[0-9+\s]*$/)
    .required()
    .label("Phone number"),
  year: Joi.number().required().label("Year"),
};

function JoinUsForm() {
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState(null);
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [cell, setCell] = useState("Event");
  const [loading, setLoading] = useState(false);
  const [goHome, setGoHome] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    const data = {
      fullName: watch("fullName"),
      email: watch("email"),
      phone: phone,
    };

    if (year) data["year"] = year;

    let err = validate(data, schema);
    data["cell"] = cell;

    setError(err);

    if (!err) {
      setLoading(true);
      await addDoc(collection(db, "joined_users"), data)
        .then((res) => {
          setOpenSuccess(true);
        })
        .catch((err) => {
          setOpenFail(true);
        })
        .finally(() => {
          setLoading(false);
          setGoHome(true);
        });
    }
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseFail = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFail(false);
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}
      >
        <h1>Join us</h1>
        <img src={joinUsImage} className="ill-img" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: 600,
          width: "50%",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          gap: 40,
          alignItems: "center",
        }}
      >
        <TextField
          error={error ? (error.fullName ? true : false) : false}
          id="standard-error-helper-text"
          label="Full Name"
          variant="standard"
          {...register("fullName")}
          helperText={error ? error.fullName : ""}
          fullWidth
        />
        <TextField
          error={error ? (error.email ? true : false) : false}
          id="standard-error-helper-text"
          label="E-mail"
          variant="standard"
          {...register("email")}
          helperText={error ? error.email : ""}
          fullWidth
        />
        <MuiTelInput
          error={error ? (error.phone ? true : false) : false}
          name="phone"
          preferredCountries={["MA"]}
          defaultCountry="MA"
          onlyCountries={["MA"]}
          value={phone}
          onChange={(newValue) => setPhone(newValue)}
          helperText={error?.phone ? "Phone number is invalid" : ""}
          variant="standard"
          fullWidth
        />
        <FormControl
          variant="standard"
          fullWidth
          error={error && error.year ? true : false}
        >
          <InputLabel id="demo-simple-select-standard-error-label">
            Year
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-helper-error-label"
            id="demo-simple-select-standard-helper-error"
            value={year}
            label="Year"
            onChange={(e) => setYear(e.target.value)}
          >
            {Array.from({ length: YEARS }, (_, index) => index + 1).map(
              (_, index) => (
                <MenuItem key={index} value={index + 1}>{`${
                  index + 1
                } Year`}</MenuItem>
              )
            )}
          </Select>
          {error && error.year && (
            <FormHelperText>{error["year"]}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cell</InputLabel>
          <Select
            inputProps={{ "aria-label": "Without label" }}
            value={cell}
            label="Target"
            onChange={(event) => {
              setCell(event.target.value);
            }}
            fullWidth
          >
            {CELLS.map(({ name, image }, index) => (
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
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : !goHome ? (
          <Button2 type="submit" label="Submit" />
        ) : (
          <Button2 type="button" label="Home" onClick={() => navigate("/")} />
        )}
      </form>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseFail}
      >
        <Alert1
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registration with success
        </Alert1>
      </Snackbar>
      <Snackbar
        open={openFail}
        autoHideDuration={6000}
        onClose={handleCloseFail}
      >
        <Alert1
          onClose={handleCloseFail}
          severity="error"
          sx={{ width: "100%" }}
        >
          Somthing went wrong.. Try later!
        </Alert1>
      </Snackbar>
    </div>
  );
}

export default JoinUsForm;
