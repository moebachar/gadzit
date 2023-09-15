import React, { useEffect, useState } from "react";
import "./joinUs.scss";
import { useNavigate } from "react-router-dom";
// import Particles from "react-particles";

function JoinUs({ endDate }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  // const params = {
  //   particles: {
  //     number: {
  //       value: 160,
  //       density: {
  //         enable: false,
  //       },
  //     },
  //     size: {
  //       value: 3,
  //       random: true,
  //       anim: {
  //         speed: 4,
  //         size_min: 0.3,
  //       },
  //     },
  //     line_linked: {
  //       enable: false,
  //     },
  //     move: {
  //       random: true,
  //       speed: 1,
  //       direction: "top",
  //       out_mode: "out",
  //     },
  //   },
  //   interactivity: {
  //     events: {
  //       onhover: {
  //         enable: true,
  //         mode: "bubble",
  //       },
  //       onclick: {
  //         enable: true,
  //         mode: "repulse",
  //       },
  //     },
  //     modes: {
  //       bubble: {
  //         distance: 250,
  //         duration: 2,
  //         size: 0,
  //         opacity: 0,
  //       },
  //       repulse: {
  //         distance: 400,
  //         duration: 4,
  //       },
  //     },
  //   },
  // };
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    if (difference <= 0) {
      setFinished(true);
      return;
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };
  useEffect(() => {
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="join-us">
      <div className="join-us__background"></div>
      <div className="join-us__content">
        <div className="join-us__content__top">
          <div id="time">
            <span id="days">{days}</span>{" "}
            <span id="following-text">{" Days "}</span>
            <span id="hours">{hours}</span>{" "}
            <span id="following-text">{" Houres "}</span>
            <span id="min">{minutes}</span>{" "}
            <span id="following-text">{" Mins "}</span>
            <span id="sec">{seconds}</span>{" "}
            <span id="following-text">{" Secs "}</span>
          </div>
        </div>
        <div className="join-us__content__bottom">
          <span>WE ARE RECRUITING</span>
          <button onClick={() => navigate("/join-us")}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
