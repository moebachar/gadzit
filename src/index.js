import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from "./components/calendar/Calendar";
import SelectInput from "./components/commun/SelectInput";
import TeleInput from "./components/commun/TeleInput";
import TextInput from "./components/commun/TextInput";
import NavBar from "./components/navbar/NavBar";
import WorkshopsFormsStepper from "./components/workshopes/WorkshopsFormsStepper";
import { AuthProvider } from "./utils/authContext";
//MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/login/Login";
import AdminConsole from "./components/adminConsole/AdminConsole";
import { getAuth } from "firebase/auth";
import JoinUsForm from "./components/joinUsForm/joinUsForm";
import ErrorPage from "./components/Error404/ErrorPage";

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/workshops-order",
    element: <WorkshopsFormsStepper />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-console",
    element: <AdminConsole />,
  },
  { path: "/join-us", element: <JoinUsForm /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
