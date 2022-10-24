import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("Test App", () => {
  it("renders learn react link", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/Jobly/i);
    expect(linkElement).toBeInTheDocument();
  });
});
