import { validateField } from "../../util/validateField";

const requiredErrorMsg = "Required Failed";
const regexValidationErrorMsg = "Regex Failed";
const requiredValidationRule = { required: { message: requiredErrorMsg } };
const regexValidationRule = {
  regex: {
    regex: /[a-z]+/g, // lower case only
    message: regexValidationErrorMsg,
  },
};

test("Empty validation on data returns no errors", () => {
  expect(validateField({}, 111).length).toBe(0);
});
test("Null validation on data returns no errors", () => {
  expect(validateField(null, "test").length).toBe(0);
});
test("undefined validation on data returns no errors", () => {
  expect(validateField(null, "test").length).toBe(0);
});
test("required on null data returns one errors", () => {
  expect(validateField(requiredValidationRule, null).length).toBe(1);
});
test("required on undefined data returns one errors", () => {
  expect(validateField(requiredValidationRule, undefined).length).toBe(1);
});
test("Required validation on no data returns 1 error", () => {
  expect(validateField(requiredValidationRule, "").length).toBe(1);
});
test("Required validation on no data returns the right error message", () => {
  expect(validateField(requiredValidationRule, "")[0]).toBe(requiredErrorMsg);
});
test("Required validation on 'test' returns no errors", () => {
  expect(validateField(requiredValidationRule, "test").length).toBe(0);
});
test("Regex validation on correct data returns no errors", () => {
  expect(validateField(regexValidationRule, "test").length).toBe(0);
});
test("Regex validation on incorrect data returns one errors", () => {
  expect(validateField(regexValidationRule, "123").length).toBe(1);
});
test("Regex validation on incorrect data returns the right error message", () => {
  expect(validateField(regexValidationRule, "123")[0]).toBe(regexValidationErrorMsg);
});
test("Nested validation on incorrect data returns two error messages", () => {
  expect(validateField({ ...regexValidationRule, ...requiredValidationRule }, "").length).toBe(2);
});
test("Nested validation on one incorrect data returns one error messages", () => {
  expect(validateField({ ...regexValidationRule, ...requiredValidationRule }, "123").length).toBe(1);
});
