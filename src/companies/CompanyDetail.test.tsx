import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";

import { setupServer } from "msw/node";
import { rest } from "msw";
import { BASE_URL, company } from "../testMockData";

const server = setupServer(
  rest.get(`${BASE_URL}/companies/:handle`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ company }));
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
        <CompanyDetail />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("render detail", async () => {
    render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );

    await screen.findAllByTestId("company-detail");
    expect(screen.getByText(/Anderson/i)).toBeInTheDocument();
    expect(screen.getByText(/Somebody/i)).toBeInTheDocument();
  });
  // FIXME: errors
  it("throws error", async () => {
    server.use(
      rest.get(`${BASE_URL}/companies/:handle`, (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({
            error: ["404 page not found"],
          })
        );
      })
    );
    render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Anderson/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Somebody/i)).not.toBeInTheDocument();
  });
});
