import { useState, useEffect } from "react";
import validateForm from "../../util/validateForm";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Card, CardContent, CardActions, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    padding: theme.spacing(4),
    width: "75%",
  },
  field: {
    width: "90%",
    padding: `${theme.spacing(6)}px ${theme.spacing(12)}px`,
    margin: `${theme.spacing(4)}px 0`,
    border: theme.border.normal,
    borderRadius: `${theme.spacing(4) / 2}px`,
    "&[type='checkbox']": {
      width: "10%",
    },
  },
  inputError: {
    border: theme.border.error,
    color: theme.palette.error.light,
    "&::-webkit-input-placeholder": {
      color: theme.palette.error.light,
    },
    "&:focus": {
      color: "black",
    },
  },
  fieldText: {
    display: "contents",
  },
  fieldError: {
    color: theme.palette.error.light,
  },
  action: {
    marginLeft: "auto",
    padding: theme.spacing(8),
  },
}));

// takes in step config to displays its fields and validate input
const FormStep = ({ config, step, submit }) => {
  const classes = useStyles();
  const [submitForm, setSubmitForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [stepConfig, setStepConfig] = useState(config);
  const [formToBeValidated, setFormToBeValidated] = useState(false);

  // change current step config whenever props.config changes
  useEffect(() => {
    setStepConfig(config);
  }, [config]);

  // validate form when submitted or formToBeValidated becomes true
  useEffect(() => {
    if (formToBeValidated || submitForm) {
      const formConfig = formToBeValidated[0];
      const fieldIndex = formToBeValidated[1];
      const fieldValue = formToBeValidated[2];
      const [errorCount, stepConfigWithErrors, formData] = validateForm(formConfig, fieldIndex, fieldValue);
      setStepConfig(stepConfigWithErrors);
      if (errorCount === 0 && submitForm === true) {
        // submit callback from formComponent
        submit(step, formData);
      }
    }
    return () => {
      // component rerender should not have side effects
      setSubmitForm(false);
      setFormToBeValidated(false);
    };
  }, [formToBeValidated, submitForm]);

  const submitStep = () => {
    setFormToBeValidated([stepConfig]);
    setSubmitForm(true);
  };

  const onFieldChange = (e, field, index) => {
    // validate single field only
    setFormToBeValidated([stepConfig, index, e.target.value]);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {/* Render component if present */}
      {stepConfig?.component ? stepConfig.component : ""}
      {/* Render fields */}
      {stepConfig?.fields?.map((field, index) => {
        return (
          <div key={field.label} className={classes.fieldContainer}>
            {/* TODO create custom Field component that renders HTML Element based on type to allow textareas radio etc */}
            <input
              className={`${classes.field} ${field.errors ? classes.inputError : ""}`}
              label={field.label}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={(e) => {
                onFieldChange(e, field, index);
              }}
            />
            <div className={classes.fieldText}>{field.text}</div>
            <div className={classes.fieldError}>{field.errors?.map((error) => error)}</div>
          </div>
        );
      })}
      <div className={classes.action}>
        {/* Render submit */}
        {stepConfig?.submit ? (
          <Button variant="contained" size="large" color="primary" onClick={submitStep}>
            {stepConfig?.submit}
          </Button>
        ) : (
          ""
        )}
      </div>
    </Grid>
  );
};

export default FormStep;
