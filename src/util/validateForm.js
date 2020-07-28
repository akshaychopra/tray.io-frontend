import { validateField } from "./validateField";
import cloneDeep from "lodash.clonedeep";

let errorCount = 0;
let formData = {};
/**
 * validates individual field if its index is present else valdiates the whole form
 *
 * @param {JSON} config - the step config
 * @param {Number} index - the index of the field that needs to be validated
 * @param {any} value - the value of the field that needs to be validated
 *
 * @return error count, form config with errors attached to each field, valid form data
 */
function validateForm(config, index, value) {
  const formConfig = cloneDeep(config); // deep clone to copy any regex and function in the config
  errorCount = 0;
  if (config && Object.keys(config).length > 0) {
    if (typeof index !== "undefined" && index !== null) {
      // validate one field only
      const errors = validateField(formConfig.fields[index].validation, value);
      formConfig.fields[index].validated = true;
      if (errors.length) {
        handleError(errors, index, formConfig);
      } else {
        handleValidationSuccess(index, value, formConfig);
      }
    } else {
      // validate all fields in formConfig
      formConfig.fields?.forEach((field, index) => {
        if (field.validation && !field.validated) {
          const errors = validateField(field.validation, field.value || ""); //validate actual value else use empty string as default
          formConfig.fields[index].validated = true;
          if (errors.length) {
            handleError(errors, index, formConfig);
          } else {
            handleValidationSuccess(index, value, formConfig);
          }
        } else {
          // been validated before so we check for errors directly
          if (field.errors?.length > 0) {
            errorCount++;
          }
        }
      });
    }
  }
  return [errorCount, formConfig, formData];
}
const handleValidationSuccess = (index, value, formConfig) => {
  // if the input had an error previously, delete it and reduce error count
  if (formConfig.fields[index].errors) {
    delete formConfig.fields[index].errors;
    if (errorCount) {
      errorCount--;
    }
  }
  // value is correct, assign to formData
  formData[formConfig.fields[index].label] = value;
};
const handleError = (errors, index, formConfig) => {
  errorCount++;
  formConfig.fields[index].errors = errors;
};
export default validateForm;
