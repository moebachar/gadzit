import React, { useState } from "react";
import "./stepper.scss";
import FillInfos from "./FillInfos";
import WorkshopsIntoduction from "./WorkshopsIntroduction";
import Confirmation from "./Confirmation";

//MUI
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { StepContent } from "@mui/material";
import { Paper } from "@mui/material";
import Finished from "./Finished";

const steps = ["Discorver our workshops", "Fill your infos", "Confirmation"];

function WorkshopsFormsStepper(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [globalData, setGlobalData] = useState(null);
  const [state, setState] = useState("sending");
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const components = [
    <WorkshopsIntoduction
      handleNext={handleNext}
      setGlobalData={setGlobalData}
    />,
    <FillInfos handleNext={handleNext} setGlobalData={setGlobalData} />,
    <Confirmation
      data={globalData}
      setGlobaldata={setGlobalData}
      handleReset={handleReset}
      handleNext={handleNext}
      setState={setState}
    />,
  ];
  console.log(globalData);
  return (
    <>
      <Box sx={{ width: "100%" }} className="horizontal-box">
        <Stepper activeStep={activeStep} sx={{ marginBottom: 10 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Finished state={state} />
        ) : (
          <React.Fragment>{components[activeStep]}</React.Fragment>
        )}
      </Box>
      <Box sx={{ maxWidth: 700 }} className="vertical-box">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
              <StepContent>{components[index]}</StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && <Finished state={state} />}
      </Box>
    </>
  );
}

export default WorkshopsFormsStepper;
