import { formValidationTypes } from "../interfaces/validationType";

/**
 * validate value based on given set of validationRules
 *
 * @param {JSON} validationRules - all the validation rules
 * @param {any} value - the value of the field that needs to be validated
 *
 * @return list of errors
 */
export const validateField = (validationRules, value) => {
  if (!validationRules) {
    return [];
  }
  let errors = [];
  const keys = Object.keys(validationRules);
  keys.map((key) => {
    switch (key) {
      case formValidationTypes.required:
        if (!value) errors.push(validationRules[formValidationTypes.required].message);
        break;
      case formValidationTypes.regex:
        if (!value.match(validationRules[formValidationTypes.regex].regex)) {
          errors.push(validationRules[formValidationTypes.regex].message);
        }
        break;
      case formValidationTypes.customValidation:
        if (!validationRules[formValidationTypes.customValidation](value)) {
          errors.push(validationRules.customValidationError);
        }
      default:
        break;
    }
  });
  return errors;
};
