import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import { server } from "../mocks/server";
import { rest } from "msw";
import { BASE_URL } from "../testMockData";

describe("Tests CompanyDetail", () => {
  it("matches CompanyDetail snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("render CompanyDetail", async () => {
    render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );

    await screen.findAllByTestId("company-detail");
    expect(screen.getByText(/Anderson/i)).toBeInTheDocument();
    expect(screen.getByText(/Somebody/i)).toBeInTheDocument();
  });

  it("errors CompanyDetail", async () => {
    server.use(
      rest.get(`${BASE_URL}/companies/:handle`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );

    await screen.findAllByTestId("company-detail");
    expect(screen.queryByText(/Anderson/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Somebody/i)).not.toBeInTheDocument();
  });
});
