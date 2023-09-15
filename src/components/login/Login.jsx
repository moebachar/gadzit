import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import Button2 from "../commun/button2";
import Joi from "joi-browser";
import { validate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

//MUI
import { TextField, colors } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

//Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseErrorMessage } from "./utils";
import { useAuth } from "../../utils/authContext";
import { app } from "../../configs/firebaseConfig";

const lightTheme = createTheme({
  palette: { mode: "light" },
});

const schema = {
  email: Joi.string().email().required().label("E-mail"),
  password: Joi.string().min(4).max(16).required().label("Password"),
};

function Login() {
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState(null);
  const [type, SetType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const err = validate(data, schema);
    setError(err);

    if (!err) {
      const auth = getAuth(app);
      setLoading(true);
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          login(auth.currentUser);
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
          setResponseError(getFirebaseErrorMessage(error.message));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleTyple = () => {
    SetType(type === "password" ? "text" : "password");
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="login">
        <div className="login__title">Welcome Back</div>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={error ? (error.email ? true : false) : false}
            id="outlined-error-helper-text"
            label="E-mail"
            variant="outlined"
            {...register("email")}
            helperText={error ? error.email : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            error={error ? (error.password ? true : false) : false}
            id="outlined-error-helper-text"
            label="Password"
            variant="outlined"
            {...register("password")}
            helperText={error ? error.password : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleTyple}
                  />
                </InputAdornment>
              ),
            }}
            fullWidth
            type={type}
          />
          <span style={{ color: "#b9b9b9" }}>
            Not a member ?{" "}
            <a
              style={{ color: "#0095f6", cursor: "pointer" }}
              onClick={() => navigate("/join-us")}
            >
              {" "}
              Join us
            </a>
          </span>
          {responseError && <Alert severity="error">{responseError}</Alert>}
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button2 type="submit" label="Login" />
          )}
        </form>
      </div>
    </ThemeProvider>
  );
}

export default Login;
