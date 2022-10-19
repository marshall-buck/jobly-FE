/* eslint-disable testing-library/no-debugging-utils */

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavMenus from "./NavMenus";
import UserContext from '../context/UserContext'
import { userCtx } from "../testUtils";

describe("Tests Nav menus", () => {
  it("Display name when logged in", function () {
    function handleLogout() {
        expect(true).toBe(true);
      }


    const { asFragment } = render(
        <MemoryRouter>
          <UserContext.Provider value={{user: userCtx.user, token: userCtx.token}}>
            <NavMenus handleLogout={handleLogout} />
          </UserContext.Provider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/jest first/)).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/)).not.toBeInTheDocument();
    const logout = screen.getByText(/Log Out/)

    expect(logout).toBeInTheDocument();
    fireEvent.click(logout)
    expect.assertions(6);



  });

  it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserContext.Provider value={{user: null, token: null}}>
            <NavMenus  handleLogout={jest.fn}  />
          </UserContext.Provider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(/jest first/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Log Out/)).not.toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
  });

})

