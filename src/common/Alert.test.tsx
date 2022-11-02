import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Alert from "./Alert";

const resetErrors = jest.fn();

describe("Test Alert", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <Alert
          type={"error"}
          messages={["message"]}
          resetErrors={resetErrors}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("uses closeAlert", () => {
    render(
      <MemoryRouter>
        <Alert
          type={"error"}
          messages={["message"]}
          resetErrors={resetErrors}
        />
      </MemoryRouter>
    );

    const button = screen.getByText(/dismiss/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(resetErrors).toBeCalledTimes(1);
  });
  it("renders correct message", () => {
    render(
      <MemoryRouter>
        <Alert
          type={"error"}
          messages={["message", "another one"]}
          resetErrors={resetErrors}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/message/i)).toBeInTheDocument();
    expect(screen.getByText(/another/i)).toBeInTheDocument();
  });
});
