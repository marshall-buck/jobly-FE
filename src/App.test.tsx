import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("Test App", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders w/out crashing", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText(/jest first/)).not.toBeInTheDocument();
    expect(screen.getAllByText(/sign up/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/login/i)).toHaveLength(4);
  });
});
