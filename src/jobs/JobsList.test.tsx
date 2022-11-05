import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobsList from "./JobsList";

describe("Tests JobsList", () => {
  it("matches JobsList snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows all jobs in JobsList", async () => {
    render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );
    const out = await waitFor(() => screen.findByRole("list"));

    expect(out).toHaveTextContent(/Conservator/i);
    expect(screen.getByText(/jobs list/i)).toBeInTheDocument();
  });

  it("handles search bar in JobsList", async () => {
    render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );

    await waitFor(() => screen.findByRole("list"));

    const form = screen.getByTestId("search-bar-form");
    const input = screen.getByTestId("search-bar-input");
    const button = screen.getByTestId("search-bar-button");
    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "form submit" } });
    expect(input).toHaveValue("form submit");

    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "enter key" } });

    fireEvent.submit(form, { key: "Enter", charCode: 13 });
    expect(input).toHaveValue("enter key");
  });
});
