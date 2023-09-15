import React, { useState } from "react";
import { WORKSHOPS } from "../../utils/constants";
import "./confirmation.scss";
import { toast } from "react-toastify";

//MUI
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PaidIcon from "@mui/icons-material/Paid";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
//Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";
import { useNavigate } from "react-router-dom";

const MyAlert = React.forwardRef(function MyAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Confirmation({ data, handleReset, handleNext, setState }) {
  const { fullName, email, phone, workshops, total } = data;

  const navigate = useNavigate();
  const handleRestart = () => {
    handleReset();
  };

  const handleConfirm = async () => {
    handleNext();
    await addDoc(collection(db, "workshops_orders"), data)
      .then((res) => {
        setState("success");
      })
      .catch((err) => {
        setState("fail");
      });
  };
  return (
    <>
      <div className="confirmation">
        <div className="confirmation__name">
          <BadgeIcon /> <span>{fullName}</span>
        </div>
        <div className="confirmation__email">
          <EmailIcon /> <span>{email}</span>
        </div>
        <div className="confirmation__phone">
          <LocalPhoneIcon /> <span>{phone}</span>
        </div>
        <div className="confirmation__pack">
          <div>Pack : </div>
          {workshops.map((workshopsName) => {
            for (let { name, image, id } of WORKSHOPS) {
              if (workshopsName == name) {
                return (
                  <img
                    key={id}
                    src={require(`../../assets/logo/${image}.ico`)}
                  />
                );
              }
            }
          })}
        </div>
        <div className="confirmation__total">
          total : <span>{total} DH</span>
        </div>
        <Alert icon={<PaidIcon fontSize="inherit" />} severity="success">
          payment method at the school is cash
        </Alert>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button onClick={handleRestart} endIcon={<RestartAltIcon />}>
          Restart
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleConfirm} endIcon={<CheckIcon />}>
          Confirm
        </Button>
      </Box>
    </>
  );
}

export default Confirmation;
