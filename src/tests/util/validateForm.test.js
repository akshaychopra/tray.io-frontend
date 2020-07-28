import validateForm from "../../util/validateForm";
import { REGISTRATION_FORM } from "../data/registrationConfig";

test("Passing empty form gives no errors", () => {
  expect(validateForm({})).toMatchObject([0, {}, {}]);
});
test("Passing empty form with specific field gives no errors", () => {
  expect(validateForm({}, 0, 0)).toMatchObject([0, {}, {}]);
});
test("Passing null form gives no errors", () => {
  expect(validateForm(null)).toMatchObject([0, {}, {}]);
});
test("Passing undefined form gives no errors", () => {
  expect(validateForm(undefined)).toMatchObject([0, {}, {}]);
});
test("Validating all fields of registration form with empty data gives 3 errors", () => {
  expect(validateForm(REGISTRATION_FORM.pages[0])[0]).toBe(3);
});
test("Validating empty name of registration form gives 1 error", () => {
  expect(validateForm(REGISTRATION_FORM.pages[0], 0, "")[0]).toBe(1);
});
test("Validating valid name of registration form gives 0 errors", () => {
  expect(validateForm(REGISTRATION_FORM.pages[0], 0, "testname")[0]).toBe(0);
});
test("Validating wrong email of registration form gives 1 error", () => {
  expect(validateForm(REGISTRATION_FORM.pages[0], 2, "wrongemail")[0]).toBe(1);
});
test("Validating right email of registration form gives 1 error", () => {
  expect(validateForm(REGISTRATION_FORM.pages[0], 2, "good@email.com")[0]).toBe(0);
});
test("Validating right password of registration form gives 0 error", () => {
  expect(validateForm(REGISTRATION_FORM.pages[0], 3, "aaa111AAA")[0]).toBe(0);
});
test("Validating wrong password of registration form gives 0 error", () => {
  expect(validateForm(REGISTRATION_FORM.pages[0], 3, "password")[0]).toBe(1);
});
