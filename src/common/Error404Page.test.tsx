import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Error404Page from "./Error404Page";

describe("Error page tests", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});
