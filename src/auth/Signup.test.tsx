import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router-dom";
import { AlertProvider } from "../providers/AlertProvider";

const handleSignup = jest.fn();

describe("Tests Signup", () => {
  it("matches Signup snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Signup handleSignup={handleSignup} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("populates Signup form correctly", async () => {
    render(
      <MemoryRouter>
        <Signup handleSignup={handleSignup} />
      </MemoryRouter>
    );
    const form = screen.getByTestId("signup-form");
    const username = screen.getByRole("textbox", {
      name: /username/i,
    }) as HTMLElement;
    const password = screen.getByLabelText(/password/i) as HTMLElement;
    const firstName = screen.getByLabelText(/first name/i) as HTMLElement;
    const lastName = screen.getByLabelText(/last name/i) as HTMLElement;
    const email = screen.getByLabelText(/email/i) as HTMLElement;

    expect(username).not.toHaveValue();
    expect(password).not.toHaveValue();
    expect(firstName).not.toHaveValue();
    expect(lastName).not.toHaveValue();
    expect(email).not.toHaveValue();
    fireEvent.change(username, { target: { value: "new user" } });
    fireEvent.change(password, { target: { value: "new password" } });
    fireEvent.change(firstName, { target: { value: "new firstName" } });
    fireEvent.change(lastName, { target: { value: "new lastName" } });
    fireEvent.change(email, { target: { value: "new email" } });
    expect(username).toHaveValue("new user");
    expect(password).toHaveValue("new password");
    expect(firstName).toHaveValue("new firstName");
    expect(lastName).toHaveValue("new lastName");
    expect(email).toHaveValue("new email");

    fireEvent.submit(form);
    await waitFor(() => {
      expect(handleSignup).toHaveBeenCalledWith({
        username: "new user",
        password: "new password",
        firstName: "new firstName",
        lastName: "new lastName",
        email: "new email",
      });
    });
  });

  it("handles error", async () => {
    const asyncMock = jest.fn().mockImplementation(() => {
      let message = "Bad Stuff is Happening";
      throw Array.isArray(message) ? message : [message];
    });

    render(
      <MemoryRouter>
        <AlertProvider>
          <Signup handleSignup={asyncMock} />
        </AlertProvider>
      </MemoryRouter>
    );

    const form = screen.getByTestId("signup-form");
    const username = screen.getByRole("textbox", {
      name: /username/i,
    }) as HTMLElement;
    const password = screen.getByLabelText(/password/i) as HTMLElement;
    const firstName = screen.getByLabelText(/first name/i) as HTMLElement;
    const lastName = screen.getByLabelText(/last name/i) as HTMLElement;
    const email = screen.getByLabelText(/email/i) as HTMLElement;

    expect(username).not.toHaveValue();
    expect(password).not.toHaveValue();
    expect(firstName).not.toHaveValue();
    expect(lastName).not.toHaveValue();
    expect(email).not.toHaveValue();
    fireEvent.change(username, { target: { value: "new user" } });
    fireEvent.change(password, { target: { value: "new password" } });
    fireEvent.change(firstName, { target: { value: "new firstName" } });
    fireEvent.change(lastName, { target: { value: "new lastName" } });
    fireEvent.change(email, { target: { value: "new email" } });
    expect(username).toHaveValue("new user");
    expect(password).toHaveValue("new password");
    expect(firstName).toHaveValue("new firstName");
    expect(lastName).toHaveValue("new lastName");
    expect(email).toHaveValue("new email");

    fireEvent.submit(form);
    await waitFor(() => {
      expect(asyncMock).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByTestId("alert-messages")).toHaveTextContent(
        "Bad Stuff is Happening"
      );
    });
  });
});
