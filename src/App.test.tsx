import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import App from "./App";
describe("Test App", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders w/out crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText(/jest first/)).not.toBeInTheDocument();
    expect(screen.getAllByText(/sign up/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/login/i)).toHaveLength(4);
  });

  // it("goes to login page", () => {
  //   const { debug } = render(
  //     <MemoryRouter>
  //       <App />
  //     </MemoryRouter>
  //   );

  //   debug();
  // });
});
