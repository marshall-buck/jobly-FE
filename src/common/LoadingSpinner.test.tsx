import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner tests", () => {
  it("matches LoadingSpinner snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LoadingSpinner />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders LoadingSpinner correctly", () => {
    render(
      <MemoryRouter>
        <LoadingSpinner />
      </MemoryRouter>
    );
    expect(screen.getByRole(/status/)).toBeInTheDocument();
  });
});
