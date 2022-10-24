import {
  fireEvent,
  render,
  screen,
  configure,
  waitFor,
} from "@testing-library/react";
import Login from "./Login";

import { MemoryRouter } from "react-router-dom";

configure({ testIdAttribute: "data-cy" });

const handleLogin = jest.fn();

describe("Tests Login", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <Login handleLogin={handleLogin} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("populates form correctly", async function () {
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
});