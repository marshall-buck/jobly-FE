import {
  render,
  waitFor,
  screen,
  configure,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import { company } from "../testMockData";
import { setupServer } from "msw/node";
import { rest } from "msw";

configure({ testIdAttribute: "data-cy" });

const BASE_URL = "http://localhost:3001";

const server = setupServer(
  rest.get(`${BASE_URL}/companies/:handle`, (req, res, ctx) => {
    // const { handle } = req.params;
    // console.log(res(ctx.json({ company })));

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
    const { debug } = render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );

    await screen.findAllByTestId("company-detail");
    expect(screen.getByText(/Anderson/i)).toBeInTheDocument();
    expect(screen.getByText(/Somebody/i)).toBeInTheDocument();

    debug();
  });
  // FIXME: errors
  // it("throws error", async () => {
  //   server.use(
  //     rest.get(`${BASE_URL}/companies/:handle`, (req, res, ctx) => {
  //       return res(
  //         ctx.status(403),
  //         ctx.json({
  //           error: ["404 page not found"],
  //         })
  //       );
  //     })
  //   );
  //   const { debug, asFragment } = render(
  //     <MemoryRouter>
  //       <CompanyDetail />
  //     </MemoryRouter>
  //   );

  //   // debug();
  // });
});
