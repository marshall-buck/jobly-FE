import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompaniesList from "./CompaniesList";
import { companies } from "../testUtils";
import { setupServer } from "msw/node";
import { rest } from "msw";

const BASE_URL = "http://localhost:3001";

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
  // TODO: figure this out
  it("handles error", async () => {
    server.use(
      rest.get(`${BASE_URL}/companies`, (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({
            errorMessage: "404 page not found",
          })
        );
      })
    );
    render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );
  });
});
