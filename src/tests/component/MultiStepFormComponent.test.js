import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MultiStepFormComponent from "../../components/MultiStepForm/MultiStepFormComponent";
import "@testing-library/jest-dom/extend-expect";
import { REGISTRATION_FORM } from "../../formConfigs/registrationConfig";
import renderer from "react-test-renderer";

test("Renders registration form", () => {
  const tree = renderer.create(<MultiStepFormComponent config={REGISTRATION_FORM} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Fills out the registration form and make sure the success result is printed", async () => {
  const testObj = {
    name: "testname",
    email: "testemail@test.com",
    password: "aaaAAA111",
    role: "SD",
  };
  const { getByPlaceholderText, getByText } = render(<MultiStepFormComponent config={REGISTRATION_FORM} />);
  const nameInput = getByPlaceholderText("Name");
  fireEvent.change(nameInput, { target: { value: testObj.name } });
  const emailInput = getByPlaceholderText("Email");
  fireEvent.change(emailInput, { target: { value: testObj.email } });
  const roleInput = getByPlaceholderText("Role");
  fireEvent.change(roleInput, { target: { value: testObj.role } });
  const passwordInput = getByPlaceholderText("Password");
  fireEvent.change(passwordInput, { target: { value: testObj.password } });
  fireEvent.click(getByText("Submit"));
  fireEvent.click(getByText("Submit"));
  const linkElement = getByText(/Please verify your/i);
  expect(linkElement).toBeInTheDocument();
});

// mock console log
