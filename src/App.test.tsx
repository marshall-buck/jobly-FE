import {
  render,
  waitFor,
  screen,
  configure,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { companies } from "./testUtils";

configure({ testIdAttribute: "data-cy" });

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

describe("Test App", () => {
  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
