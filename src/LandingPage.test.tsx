/* eslint-disable testing-library/no-debugging-utils */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LandingPage from "./LandingPage";
import UserContext from "./context/UserContext";
import { userCtx } from "./testUtils";

describe("Tests Landing Page", () => {
  it("Display name when logged in", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <LandingPage />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/jest first/)).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/)).not.toBeInTheDocument();
  });

  it("matches snapshot when logged out", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, token: null }}>
          <LandingPage />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(/jest first/)).not.toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
  });
});
