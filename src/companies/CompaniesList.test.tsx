import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompaniesList from "./CompaniesList";

describe("Tests CompaniesList", () => {
  it("matches CompaniesList snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows all companies in CompaniesList", async () => {
    render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );
    const out = await waitFor(() => screen.findByRole("list"));
    expect(out).toHaveTextContent(/arnold/i);
    expect(screen.getByText(/companies list/i)).toBeInTheDocument();
  });

  it("handles search bar in CompaniesList", async () => {
    render(
      <MemoryRouter>
        <CompaniesList />
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
    // fireEvent.submit(form);

    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "enter key" } });

    fireEvent.submit(form, { key: "Enter", charCode: 13 });
  });
});
