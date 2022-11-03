import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobsList from "./JobsList";
import { jobs } from "../testUtils";
import { setupServer } from "msw/node";
import { rest } from "msw";

import { configure } from "@testing-library/react";

configure({ testIdAttribute: "data-cy" });

const BASE_URL = "http://localhost:3001";

const server = setupServer(
  rest.get(`${BASE_URL}/jobs`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ jobs }));
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
        <JobsList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows all jobs", async () => {
    render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );
    const out = await waitFor(() => screen.findByRole("list"));

    expect(out).toHaveTextContent(/Conservator/i);
    expect(screen.getByText(/jobs list/i)).toBeInTheDocument();
  });

  it("handles searchbar", async () => {
    const { debug } = render(
      <MemoryRouter>
        {/* <SearchBar handleSearch={handleSearch} /> */}
        <JobsList />
      </MemoryRouter>
    );

    await waitFor(() => screen.findByRole("list"));
    debug();
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
  //     rest.get(`${BASE_URL}/jobs`, (req, res, ctx) => {
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
  //       <JobsList />
  //     </MemoryRouter>
  //   );
  // });
});
