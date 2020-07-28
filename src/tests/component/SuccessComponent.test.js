import React from "react";
import { render } from "@testing-library/react";
import SuccessComponent from "../../components/SuccessComponent";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

test("Renders a success component", () => {
  const { getByText } = render(<SuccessComponent />);
  const linkElement = getByText(/Please verify your/i);
  expect(linkElement).toBeInTheDocument();
});

test("Renders registration form", () => {
  const tree = renderer.create(<SuccessComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
