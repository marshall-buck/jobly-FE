import { fireEvent, render, screen, configure } from "@testing-library/react";
import EditProfile from "./EditProfile";
import { editUser, userCtx } from "../testUtils";
import UserContext from "../context/UserContext";

import { MemoryRouter } from "react-router-dom";

configure({ testIdAttribute: "data-cy" });

const editUserMock = jest.fn();

describe("Tests EditProfile", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <EditProfile handleEditForm={editUserMock} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("populates form with data", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <EditProfile handleEditForm={editUserMock} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const username = screen.getByRole("textbox", {
      name: /username/i,
    }) as HTMLElement;
    const firstName = screen.getByRole("textbox", {
      name: /first Name/i,
    }) as HTMLElement;
    const lastName = screen.getByRole("textbox", {
      name: /last Name/i,
    }) as HTMLElement;
    const email = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLElement;

    expect(username).toHaveAttribute("disabled");
    expect(lastName).toHaveValue(userCtx.user?.lastName);
    expect(firstName).toHaveValue(userCtx.user?.firstName);
    expect(email).toHaveValue(userCtx.user?.email);
  });

  it("submits correct data", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <EditProfile handleEditForm={editUserMock} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const form = screen.queryByTestId("edit-user-form") as HTMLFormElement;
    const firstName = screen.getByRole("textbox", {
      name: /first Name/i,
    }) as HTMLElement;
    const lastName = screen.getByRole("textbox", {
      name: /last Name/i,
    }) as HTMLElement;
    const email = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLElement;

    fireEvent.change(firstName, { target: { value: editUser.firstName } });
    fireEvent.change(lastName, { target: { value: editUser.lastName } });
    fireEvent.change(email, { target: { value: editUser.email } });

    fireEvent.submit(form);

    expect(lastName).toHaveValue(editUser.lastName);
    expect(firstName).toHaveValue(editUser.firstName);
    expect(email).toHaveValue(editUser.email);

    expect(editUserMock).toHaveBeenCalledWith(editUser);
  });
});
