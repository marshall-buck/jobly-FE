import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import { BASE_URL, company, userCtx } from "../testMockData";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import JoblyApi from "../api";
import UserContext from "../context/UserContext";

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
          <Routes>
            <Route path="/companies/:handle" element={<CompanyDetail />} />
          </Routes>
        </UserContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => screen.findByTestId("company-detail"));
    expect(await screen.findByText(/Jobs/i)).toBeInTheDocument();

    expect(screen.getByText(/Anderson/i)).toBeInTheDocument();
    expect(screen.getByText(/Somebody/i)).toBeInTheDocument();
  });
  it("render  error", async () => {
    axiosMock
      .onGet(`${BASE_URL}/companies/anderson-arias-morrow"`)
      .networkError();
    let error;
    try {
      await JoblyApi.getCompanyByHandle("ander");
    } catch (err) {
      error = err;
    }
    expect(error).toEqual([
      "API ERROR , Error: Request failed with status code 404",
    ]);

    render(
      <MemoryRouter initialEntries={["/companies/ander"]}>
        <UserContext.Provider
          value={{ user: userCtx.user, token: userCtx.token }}
        >
          <Routes>
            <Route path="/companies/:handle" element={<CompanyDetail />} />
          </Routes>
        </UserContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => screen.findByTestId("company-detail"));
    expect(
      screen.getByText("No company for you, pleas try again")
    ).toBeInTheDocument();
  });
});
