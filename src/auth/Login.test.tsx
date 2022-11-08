import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

const handleLogin = jest.fn();

describe("Tests Login", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Login handleLogin={handleLogin} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("populates Login form correctly", async () => {
    render(
      <MemoryRouter>
        <Login handleLogin={handleLogin} />
      </MemoryRouter>
    );
    const form = screen.getByTestId("login-form");
    const username = screen.getByRole("textbox", {
      name: /username/i,
    }) as HTMLElement;
    const password = screen.getByLabelText(/password/i) as HTMLElement;

    expect(username).not.toHaveValue();
    expect(password).not.toHaveValue();
    fireEvent.change(username, { target: { value: "new user" } });
    fireEvent.change(password, { target: { value: "new password" } });
    expect(username).toHaveValue("new user");
    expect(password).toHaveValue("new password");

    fireEvent.submit(form);
    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalledWith({
        username: "new user",
        password: "new password",
      });
    });
  });

  it("handles error", async () => {
    const asyncMock = jest.fn().mockImplementation(() => {
      let message = "Error message";
      throw Array.isArray(message) ? message : [message];
    });

    render(
      <MemoryRouter>
        <Login handleLogin={asyncMock} />
      </MemoryRouter>
    );

    const form = screen.getByTestId("login-form");
    const username = screen.getByRole("textbox", {
      name: /username/i,
    }) as HTMLElement;
    const password = screen.getByLabelText(/password/i) as HTMLElement;

    expect(username).not.toHaveValue();
    expect(password).not.toHaveValue();
    fireEvent.change(username, { target: { value: "new user" } });
    fireEvent.change(password, { target: { value: "new password" } });
    expect(username).toHaveValue("new user");
    expect(password).toHaveValue("new password");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(asyncMock).toHaveBeenCalled();
    });
  });
});
