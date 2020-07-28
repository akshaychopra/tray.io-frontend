import FormStep from "../MultiStepForm/FormStep";
import { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, createMuiTheme, ThemeProvider } from "@material-ui/core";

const defaultTheme = createMuiTheme();
// custom theme for multistep forms
const theme = createMuiTheme({
  spacing: 2,
  color: {
    green: defaultTheme.palette.success.main,
  },
  border: {
    normal: `1px solid #CCC`,
    error: `1px solid ${defaultTheme.palette.error.light}`,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
}));

/**
 * Component to create a multi step form
 * @param {JSON} config - forms configuration parameters
 */
const MultiStepFormComponent = ({ config }) => {
  const classes = useStyles();
  // defaults to 0 step and first page
  const [step, setStep] = useState(0);
  const [stepConfig, setStepConfig] = useState(config.pages[0]);

  const onStepSubmit = (step, formData) => {
    // if not at last page move to next page
    if (!(config.pages.length - 1 === step)) {
      setStep(step + 1);
      setStepConfig(config.pages[step + 1]);
    }
    // if the config tells you to explicitly submit or it is the last page then submit form
    if (config.pages[step].submitData || config.pages.length - 1 === step) {
      config.onSubmit(formData);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <CardContent>
          <Stepper activeStep={step}>
            {config.pages.map((page) => (
              <Step key={page.name}>
                <StepLabel>{page.name}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <FormStep config={stepConfig} step={step} submit={onStepSubmit} />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default MultiStepFormComponent;
