import React from "react";
import "./eventCard.scss";

//MUI
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Tooltip } from "@mui/material";

function EventCard({ event }) {
  const { wrtier, title, time, date, description, pv } = event;
  //const {image, firstName, lastName, bureau} = writer;
  const firstName = "Mohamed";
  const lastName = "BACHAR";
  const bureau = true;
  return (
    <div className="event-card">
      <img
        className="event-card__user-image"
        src={require("../../assets/images/clubLogo.png")}
      />
      <div className="event-card__content">
        <div className="event-card__content__title">{title}</div>
        <div className="event-card__content__date">
          <span>{time} •</span>
          <span>{date}</span>
        </div>
        <div className="event-card__content__description">{description}</div>
        <div className="event-card__content__footer">
          <div className="event-card__content__footer__writer">
            <img src={require("../../assets/images/randomUser.png")} />
            <span>{`${firstName} ${lastName}`}</span>
          </div>
          {bureau && pv ? (
            <Tooltip title="PV">
              <DownloadIcon
                style={{ width: "7%", height: "7%", cursor: "pointer" }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Upload PV">
              <UploadFileIcon
                style={{ width: "7%", height: "7%", cursor: "pointer" }}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
