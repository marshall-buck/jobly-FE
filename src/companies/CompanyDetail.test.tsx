import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";

import { BASE_URL, company, userCtx } from "../testMockData";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import JoblyApi from "../api";
import UserContext from "../context/UserContext";
import RoutesList from "../navigation/RoutesList";

describe("Tests CompanyDetail", () => {
  let axiosMock: MockAdapter;
  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });
  it("matches CompanyDetail snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyDetail />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("render CompanyDetail", async () => {
    axiosMock
      .onGet(`${BASE_URL}/companies/anderson-arias-morrow`)
      .reply(200, { company });
    const res = await JoblyApi.getCompanyByHandle("anderson-arias-morrow");
    expect(res).toEqual(company);
    expect(res.handle).toContain("anderson-arias-morrow");

    render(
      <MemoryRouter initialEntries={["/companies/anderson-arias-morrow"]}>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <RoutesList
            handleSignup={jest.fn()}
            handleLogin={jest.fn()}
            handleEditForm={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => screen.findByTestId("company-detail"));
    expect(screen.getByText(/Jobs/i)).toBeInTheDocument();

    expect(screen.getByText(/Anderson/i)).toBeInTheDocument();
    expect(screen.getByText(/Somebody/i)).toBeInTheDocument();
  });
});
