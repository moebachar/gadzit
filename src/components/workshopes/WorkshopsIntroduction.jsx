import React, { useState, useEffect } from "react";
import { WORKSHOPS } from "../../utils/constants";
import { keyframes } from "@emotion/react";
import "./tabs.scss";

//MUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Chip, Paper } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 7px 4px rgba(0, 255, 0, 0.6);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.2);
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index, type) {
  return {
    id: `${type}-tab-${index}`,
    "aria-controls": `${type}-tabpanel-${index}`,
  };
}

function WorkshopsIntoduction({ handleNext }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container" style={{ display: "flex" }}>
        <div className="vertical">
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {WORKSHOPS.map(
              ({ id, name, description, price, discount }, index) => (
                <Tab key={id} label={name} {...a11yProps(index, "vertical")} />
              )
            )}
          </Tabs>
        </div>
        <div className="simple">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            {WORKSHOPS.map(
              ({ id, name, description, price, discount }, index) => (
                <Tab key={id} label={name} {...a11yProps(index, "simple")} />
              )
            )}
          </Tabs>
        </div>
        {WORKSHOPS.map(
          ({ id, name, description, price, discount, image }, index) => (
            <TabPanel key={id} value={value} index={index}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2%",
                  maxWidth: 600,
                  margin: "0 auto",
                  fontFamily: "Inter",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "fit-content",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <img
                      src={require(`../../assets/logo/${image}.ico`)}
                      style={{ width: "10%", minWidth: 50 }}
                    />
                    <span>{name}</span>
                  </div>
                  <Chip
                    label={`price: ${price}DH`}
                    color="success"
                    variant="outlined"
                    sx={{
                      height: 25,
                      animation: discount
                        ? `${glowAnimation} 1.5s infinite`
                        : "none",
                    }}
                  />
                </div>
                <p>{description}</p>
              </Paper>
            </TabPanel>
          )
        )}
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext} endIcon={<NavigateNextIcon />}>
          Next
        </Button>
      </Box>
    </>
  );
}

export default WorkshopsIntoduction;
