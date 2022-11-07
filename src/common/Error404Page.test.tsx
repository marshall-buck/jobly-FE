import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Error404Page from "./Error404Page";

describe("Error404Page page tests", () => {
  it("matches Error404Page snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Error404Page correctly", () => {
    render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});
