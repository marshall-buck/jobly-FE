import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Test App", () => {
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/Jobly/i);
    expect(linkElement).toBeInTheDocument();
  });
});
