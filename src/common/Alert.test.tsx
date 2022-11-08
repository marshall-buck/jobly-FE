import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AlertContext from "../context/UseAlertContext";
import { AlertTypes } from "../interfaces";
import AlertPopup from "./Alert";

describe("Alert tests", () => {
  it("matches Alert snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AlertPopup />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Alert correctly", () => {
    const close = jest.fn();
    render(
      <MemoryRouter>
        <AlertContext.Provider
          value={{
            message: "Bad Stuff is Happening",
            type: AlertTypes.ERROR,
            setAlert: close,
          }}
        >
          <AlertPopup />
        </AlertContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole(/alert/)).toBeInTheDocument();
    expect(screen.getByText("Bad Stuff is Happening")).toBeInTheDocument();
    expect(screen.getByTestId("alert-messages")).toHaveTextContent(
      "Bad Stuff is Happening"
    );
    expect(screen.getByRole(/alert/)).toHaveClass("alert-error");

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
    expect(close).toBeCalled();
  });

  it("renders Alert map", () => {
    const close = jest.fn();
    render(
      <MemoryRouter>
        <AlertContext.Provider
          value={{
            message: [
              "Bad Stuff is Happening",
              "Bad Stuff is Happening gainly",
            ],
            type: AlertTypes.ERROR,
            setAlert: close,
          }}
        >
          <AlertPopup />
        </AlertContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole(/alert/)).toBeInTheDocument();
    expect(screen.getByText("Bad Stuff is Happening")).toBeInTheDocument();
    expect(screen.getByTestId("alert-messages")).toHaveTextContent(
      "Bad Stuff is Happening"
    );
  });
});
