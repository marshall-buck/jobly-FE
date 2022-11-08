import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AlertType } from "../interfaces";
import Alert from "./Alert";

const alertOff = {
  type: AlertType.ERROR,
  message: [],
  onDismiss: jest.fn(),
  isVisible: false,
};

const alertOn = {
  type: AlertType.ERROR,
  message: ["Bad Stuff is Happening"],
  onDismiss: jest.fn(),
  isVisible: true,
};

describe("Alert tests", () => {
  it("matches Alert snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Alert {...alertOn} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Alert correctly", () => {
    render(
      <MemoryRouter>
        <Alert {...alertOn} />
      </MemoryRouter>
    );
    expect(screen.getByRole(/alert/)).toBeInTheDocument();
    expect(screen.getByText("Bad Stuff is Happening")).toBeInTheDocument();
    expect(screen.getByRole(/alert/)).toHaveClass(alertOn.type);
  });

  it("hides Alert correctly", () => {
    render(
      <MemoryRouter>
        <Alert {...alertOff} />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("alert-messages")).toBeEmptyDOMElement();
    expect(screen.getByRole(/alert/)).toHaveClass("hidden");
  });
  it("closes Alert correctly", async () => {
    render(
      <MemoryRouter>
        <Alert {...alertOn} />
      </MemoryRouter>
    );

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(alertOn.onDismiss).toHaveBeenCalled();
    });
  });
});
