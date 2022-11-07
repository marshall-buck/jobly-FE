import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavMenus from "./NavMenus";
import UserContext from "../context/UserContext";
import { userCtx } from "../testMockData";

describe("Tests NavMenus", () => {
  it("Display name when logged in - NavMenus", () => {
    const handleLogout = jest.fn();
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <NavMenus handleLogout={handleLogout} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/jest first/)).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/)).not.toBeInTheDocument();
    const logout = screen.getByText(/Log Out/);

    expect(logout).toBeInTheDocument();
    fireEvent.click(logout);
    expect.assertions(5);
  });

  it("matches snapshot when logged out - NavMenus", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, token: null }}>
          <NavMenus handleLogout={jest.fn} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(/jest first/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Log Out/)).not.toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
  });
});
