import React from "react";

//MUI
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EventCard from "./EventCard";

export default function EventDialog({ events, open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="body"
    >
      <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
        {events ? "List of events for the day" : "No events planned"}
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {events &&
          events.map((event, index) => <EventCard event={event} key={index} />)}
      </DialogContent>
    </Dialog>
  );
}
