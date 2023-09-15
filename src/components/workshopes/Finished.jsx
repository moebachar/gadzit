import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/animation_ll41gxc5.json";
import successAnimationData from "../../assets/animation/success.json";
import failAnimationData from "../../assets/animation/fail.json";
import { useNavigate } from "react-router-dom";

// MUI
import Button from "@mui/material/Button";

function Finished({ state }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "3%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {state == "sending" ? (
        <>
          <Lottie animationData={animationData} />
          <div>Proccessing your order...</div>
        </>
      ) : state == "success" ? (
        <>
          <Lottie animationData={successAnimationData} loop={false} />
          <div>
            THE DATE & Location of payment will be soon announced on our Social
            media as well as your e-mail , Stay informed to confirm your
            Application .
          </div>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ bgcolor: "#fff", color: "black" }}
          >
            Home
          </Button>
        </>
      ) : (
        <>
          <Lottie animationData={failAnimationData} loop={false} />
          <div>Something went wrong! Try again later</div>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ bgcolor: "#fff", color: "black" }}
          >
            Home
          </Button>
        </>
      )}
    </div>
  );
}

export default Finished;
