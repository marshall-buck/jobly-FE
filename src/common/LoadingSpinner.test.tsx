import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

describe("Error page tests", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <LoadingSpinner />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <LoadingSpinner />
      </MemoryRouter>
    );
    expect(screen.getByRole(/status/)).toBeInTheDocument();
  });
});
