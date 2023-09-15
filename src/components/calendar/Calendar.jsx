import React, { useState } from "react";
import "./calendar.scss";
import {
  getCalendar,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
  getEvents,
  getMonthName,
} from "./utils";
import { getData } from "./fakeService";
import Shipe from "./Shipe";

//MUI
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EventDialog from "./EventDialog";
import AddEventFormDialog from "./AddEventFormDialog";

import { getAuth } from "firebase/auth";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Calendar() {
  const [day, setDay] = useState([3, 3]);
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(getCurrentYear());
  const [calendar, setCalendar] = useState(getCalendar(month, year));
  const [data, setData] = useState(getData());
  const [events, setEvents] = useState(getEvents(calendar, year, data));
  const [auth, setAuth] = useState(getAuth());

  const handleNextMonth = () => {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    setMonth(nextMonth);
    setYear(nextYear);
    setCalendar(getCalendar(nextMonth, nextYear));
    setEvents(getEvents(getCalendar(nextMonth, nextYear), nextYear, data));
  };

  const handlePreviousMonth = () => {
    const previousMonth = month === 1 ? 12 : month - 1;
    const previousYear = month === 1 ? year - 1 : year;

    setMonth(previousMonth);
    setYear(previousYear);
    setCalendar(getCalendar(previousMonth, previousYear));
    setEvents(
      getEvents(getCalendar(previousMonth, previousYear), previousYear, data)
    );
  };

  //EVENT DIALOG
  const [open, setOpen] = useState(false);

  const handleClickOpen = (i, j) => {
    setDay([i, j]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //FORM DIALOG
  const [formOpen, setFormOpen] = useState(false);

  const handleClickFormOpen = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-container__header">
        <ArrowBackIosIcon
          onClick={handlePreviousMonth}
          style={{ color: "#fff", cursor: "pointer" }}
        />
        <div className="calendar-container__header__center">
          <div className="calendar-container__header__center__month">
            {getMonthName(month)}
          </div>

          <div className="calendar-container__header__center__year">{year}</div>
        </div>
        <ArrowForwardIosIcon
          onClick={handleNextMonth}
          style={{ color: "#fff", cursor: "pointer" }}
        />
      </div>
      <div className="calendar-container__days">
        {dayNames.map((d, index) => (
          <span key={index}>{d}</span>
        ))}
      </div>
      <div className="calendar-container__grid">
        {calendar.map((week, i) => {
          return (
            <div className="calendar-container__grid__week" key={i}>
              {week.map(({ month: m, day: d }, j) => {
                return (
                  <div
                    className={
                      "calendar-container__grid__week__day--" +
                      (m === month ? "focused" : "non-focused")
                    }
                    key={i * 10 + j}
                    onClick={() => handleClickOpen(i, j)}
                  >
                    <div
                      className={
                        "calendar-container__grid__week__day--" +
                        (m === month ? "focused" : "non-focused") +
                        "__number" +
                        (month == getCurrentMonth() &&
                        year == getCurrentYear() &&
                        d == getCurrentDay()
                          ? "--current"
                          : "")
                      }
                    >
                      {d}
                    </div>
                    <div
                      className={
                        "calendar-container__grid__week__day--" +
                        (m === month ? "focused" : "non-focused") +
                        "__content"
                      }
                    >
                      {events[i][j] &&
                        events[i][j]
                          .slice(0, 3)
                          .map(({ type, title }, index) => (
                            <Shipe key={index} type={type} title={title} />
                          ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="calendar-container__footer">
        <Tooltip title="Add Event">
          <AddCircleIcon
            className="calendar-container__add"
            style={{ width: 40, height: 40 }}
          />
        </Tooltip>
        <ArrowBackIosIcon
          onClick={handlePreviousMonth}
          style={{ color: "#fff", cursor: "pointer" }}
        />
        <div className="calendar-container__footer__center">
          <div className="calendar-container__footer__center__month">
            {getMonthName(month)}
          </div>

          <div className="calendar-container__footer__center__year">{year}</div>
        </div>
        <ArrowForwardIosIcon
          onClick={handleNextMonth}
          style={{ color: "#fff", cursor: "pointer" }}
        />
      </div>

      <Tooltip title="Add Event">
        <AddCircleIcon
          className="calendar-container__add"
          style={{ width: "5%", height: "5%" }}
          onClick={handleClickFormOpen}
        />
      </Tooltip>
      <EventDialog
        open={open}
        handleClose={handleClose}
        events={events[day[0]][day[1]]}
      />
      <AddEventFormDialog open={formOpen} handleClose={handleCloseForm} />
    </div>
  );
}

export default Calendar;
