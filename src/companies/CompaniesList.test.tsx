import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompaniesList from "./CompaniesList";
import { BASE_URL, companies } from "../testMockData";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get(`${BASE_URL}/companies`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ companies }));
  })
);
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe("Tests Company Card", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows all companies", async () => {
    render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );
    const out = await waitFor(() => screen.findByRole("list"));
    expect(out).toHaveTextContent(/arnold/i);
    expect(screen.getByText(/companies list/i)).toBeInTheDocument();
  });

  it("handles searchbar", async () => {
    const { debug } = render(
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
  // TODO: figure this out
  // it("handles error", async () => {
  //   server.use(
  //     rest.get(`${BASE_URL}/companies`, (req, res, ctx) => {
  //       return res(
  //         ctx.status(404),
  //         ctx.json({
  //           errorMessage: "404 page not found",
  //         })
  //       );
  //     })
  //   );
  //   render(
  //     <MemoryRouter>
  //       <CompaniesList />
  //     </MemoryRouter>
  //   );
  // });
});
