import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditProfile from "./EditProfile";
import { editUser, userCtx } from "../testMockData";
import UserContext from "../context/UserContext";
import { MemoryRouter } from "react-router-dom";

let editUserMock = jest.fn();

describe("Tests EditProfile", () => {
  it("matches EditProfile snapshot", () => {
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

  it("populates EditProfile form with data", () => {
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

  it("submits EditProfile correct data", async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <EditProfile handleEditForm={editUserMock} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const firstName = (await screen.findByRole("textbox", {
      name: /first Name/i,
    })) as HTMLElement;
    const lastName = (await screen.findByRole("textbox", {
      name: /last Name/i,
    })) as HTMLElement;
    const email = (await screen.findByRole("textbox", {
      name: /email/i,
    })) as HTMLElement;

    fireEvent.change(firstName, { target: { value: editUser.firstName } });
    fireEvent.change(lastName, { target: { value: editUser.lastName } });
    fireEvent.change(email, { target: { value: editUser.email } });

    const form = (await screen.findByTestId(
      "edit-user-form"
    )) as HTMLFormElement;

    fireEvent.submit(form);
    await waitFor(() => expect(lastName).toHaveValue(editUser.lastName));
    await waitFor(() => expect(firstName).toHaveValue(editUser.firstName));
    await waitFor(() => expect(email).toHaveValue(editUser.email));
    await waitFor(() => expect(editUserMock).toHaveBeenCalledWith(editUser));
  });

  // it("submits EditProfile handles err", async () => {
  //   editUserMock = jest
  //     .fn()
  //     .mockRejectedValue(new Error("Async error message"));
  //   const { debug } = render(
  //     <MemoryRouter>
  //       <UserContext.Provider
  //         value={{ user: userCtx.user, token: userCtx.token }}
  //       >
  //         <EditProfile handleEditForm={editUserMock} />
  //       </UserContext.Provider>
  //     </MemoryRouter>
  //   );

  //   const form = (await screen.findByTestId(
  //     "edit-user-form"
  //   )) as HTMLFormElement;

  //   const firstName = (await screen.findByRole("textbox", {
  //     name: /first Name/i,
  //   })) as HTMLElement;
  //   const lastName = (await screen.findByRole("textbox", {
  //     name: /last Name/i,
  //   })) as HTMLElement;
  //   const email = (await screen.findByRole("textbox", {
  //     name: /email/i,
  //   })) as HTMLElement;

  //   fireEvent.change(firstName, { target: { value: editUser.firstName } });
  //   fireEvent.change(lastName, { target: { value: editUser.lastName } });
  //   fireEvent.change(email, { target: { value: editUser.email } });

  //   fireEvent.submit(form);
  //   await waitFor(() => expect(editUserMock).toHaveBeenCalledWith(editUser));
  //   // expect(await screen.findByText(/error/)).toBeInTheDocument();

  //   debug();

  //   await waitFor(() => expect(lastName).toHaveValue(editUser.lastName));
  //   await waitFor(() => expect(firstName).toHaveValue(editUser.firstName));
  //   await waitFor(() => expect(email).toHaveValue(editUser.email));
  //   await waitFor(() => expect(editUserMock).toHaveBeenCalledWith(editUser));
  // });
});
