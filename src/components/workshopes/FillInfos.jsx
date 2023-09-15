import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DISCOUNT, WORKSHOPS, YEARS, FOR_DISCOUT } from "../../utils/constants";
import Joi from "joi-browser";
import { validate } from "../../utils/validation";

//MUI
import { Chip, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MuiTelInput } from "mui-tel-input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";

const schema = {
  fullName: Joi.string().min(4).max(32).required().label("Full Name"),
  email: Joi.string().email().required().label("Email Adress"),
  phone: Joi.string()
    .regex(/^[0-9+\s]*$/)
    .required()
    .label("Phone number"),
  year: Joi.number().required().label("Year"),
};

function FillInfos({ handleNext, setGlobalData }) {
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState(null);
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [total, setTotal] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);

  const handleToggle = (value) => {
    const currentIndex = workshops.indexOf(value);
    const newWorkshops = [...workshops];

    if (currentIndex === -1) {
      newWorkshops.push(value);
    } else {
      newWorkshops.splice(currentIndex, 1);
    }

    let newTotal = 0;
    for (let value of newWorkshops) {
      for (let { name, price } of WORKSHOPS) {
        newTotal += value === name ? price : 0;
      }
    }

    setOriginalTotal(newTotal);

    newTotal -=
      newWorkshops.length >= FOR_DISCOUT ? (newTotal * DISCOUNT) / 100 : 0;

    setTotal(Math.round(newTotal));
    setWorkshops(newWorkshops);
  };

  const onSubmit = () => {
    const data = {
      fullName: watch("fullName"),
      email: watch("email"),
      phone: phone,
    };

    if (year) data["year"] = year;

    let err = validate(data, schema);
    data["workshops"] = workshops;
    data["total"] = total;
    if (workshops.length === 0) {
      err = { workshops: "Chose the workshops you want please", ...err };
    }

    setError(err);

    if (!err) {
      setGlobalData(data);
      handleNext();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: 600,
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        gap: 40,
      }}
    >
      <TextField
        error={error ? (error.fullName ? true : false) : false}
        id="standard-error-helper-text"
        label="Full Name"
        variant="standard"
        {...register("fullName")}
        helperText={error ? error.fullName : ""}
      />
      <TextField
        error={error ? (error.email ? true : false) : false}
        id="standard-error-helper-text"
        label="E-mail"
        variant="standard"
        {...register("email")}
        helperText={error ? error.email : ""}
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
      <Alert severity="success">{`Benefit from a ${DISCOUNT}% discount when registering for +2 workshops`}</Alert>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={
          <ListSubheader>
            <span style={{ marginRight: 20 }}>Choose your plan :</span>
            <Chip label={`total : ${total} DH`} />
            {workshops.length >= FOR_DISCOUT && <s>{`${originalTotal} DH`}</s>}
          </ListSubheader>
        }
      >
        {WORKSHOPS.map(({ id, name, image }) => (
          <ListItem key={id}>
            <img
              src={require(`../../assets/logo/${image}.ico`)}
              style={{ width: "20%" }}
            />

            <ListItemText id={`switch-list-label-${name}`} primary={name} />
            <Switch
              edge="end"
              onChange={() => handleToggle(name)}
              checked={workshops.indexOf(name) !== -1}
              inputProps={{
                "aria-labelledby": `switch-list-label-${name}`,
              }}
            />
          </ListItem>
        ))}
      </List>
      {error && error.workshops && (
        <Alert variant="outlined" severity="error">
          {error.workshops}
        </Alert>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button type="submit" endIcon={<NavigateNextIcon />}>
          Next
        </Button>
      </Box>
    </form>
  );
}

export default FillInfos;
