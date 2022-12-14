import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "./NavBar";
import UserContext from "../context/UserContext";
import { userCtx } from "../testMockData";

describe("Navbar Tests", () => {
  it("Display name when logged in - Navbar", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <NavBar handleLogout={jest.fn} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/jest first/)).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/)).not.toBeInTheDocument();
  });

  it("matches snapshot when logged out Navbar", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, token: null }}>
          <NavBar handleLogout={jest.fn} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(/jest first/)).not.toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
  });
});
