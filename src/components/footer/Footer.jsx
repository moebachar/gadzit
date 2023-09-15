import React, { useState } from "react";
import "./footer.css";

//MUI
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Footer() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubscribe = async () => {
    const docRef = await addDoc(collection(db, "subscribe"), {
      email,
    }).then((res) => {
      setOpen(true);
    });
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col1">
            <img
              className="logo"
              src={require("../../assets/images/GadzLogo.png")}
            />
            <div className="line">
              <div className="footer-content">
                <h4>About Gadz'it</h4>
                <ul>
                  <li>
                    <a href="#announce">Announce</a>
                  </li>
                  <li>
                    <a href="#workshops">Workshops</a>
                  </li>
                  <li>
                    <a href="#members">Members</a>
                  </li>
                </ul>
              </div>
              <div className="footer-content">
                <h4>Privacy & Security</h4>
                <ul>
                  <li>
                    <a href="/terms">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="https://www.deam.ma" target="_blank">
                      ADEAM
                    </a>
                  </li>
                  <li>
                    <a href="#">© 2023 Gadz'IT</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="col2">
            <div className="footer-content-S">
              <h4>STAY INFORMED</h4>

              <input
                type="text"
                placeholder="Your email here"
                className="inputemail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  size="small"
                  sx={{ marginRight: "auto" }}
                  disabled={email == ""}
                  onClick={handleSubscribe}
                >
                  Send
                </Button>
              </Box>

              <div className="social">
                <a
                  href="https://web.facebook.com/ClubInformatiqueArtsMetiers"
                  target="_blank"
                >
                  <i className="bx bxl-facebook-circle"></i>
                </a>
                <a href="https://www.instagram.com/gadz.it/" target="_blank">
                  <i className="bx bxl-instagram-alt"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/gadz-it/"
                  target="_blank"
                >
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </footer>
  );
}

export default Footer;
