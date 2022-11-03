import {
  render,
  waitFor,
  screen,
  configure,
  fireEvent,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import CompaniesList from "./CompaniesList";
import JoblyApi from "../api";
import axios from "axios";
import { companies, filteredResults } from "../testUtils";
import MockAdapter from "axios-mock-adapter";

configure({ testIdAttribute: "data-cy" });

const BASE_URL = "http://localhost:3001";
const axiosMock: MockAdapter = new MockAdapter(axios);

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
    axiosMock.onGet(`${BASE_URL}/companies`).reply(200, { companies });
    const res = await JoblyApi.getCompanies(null);
    expect(res).toEqual(companies);
    expect(res.length).toEqual(2);

    render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );
    const out = await waitFor(() => screen.findByRole("list"));
    expect(out).toHaveTextContent(/arnold/i);
    expect(screen.getByText(/companies list/i)).toBeInTheDocument();
  });

  // it("render by filter", async () => {
  //   axiosMock
  //     .onGet(`${BASE_URL}/companies`)
  //     .reply(200, { companies: filteredResults });
  //   const res = await JoblyApi.getCompanies("ander");
  //   expect(res).toEqual(filteredResults);

  //   render(
  //     <MemoryRouter>
  //       <CompaniesList />
  //     </MemoryRouter>
  //   );
  //   const out = await waitFor(() => screen.findByRole("list"));
  //   expect(out).toHaveTextContent(/Somebody program how/i);
  //   expect(screen.getByText(/companies list/i)).toBeInTheDocument();
  // });

  // it("searches", async () => {
  //   axiosMock.onGet(`${BASE_URL}/companies`).reply(200, { companies });
  //   const res = await JoblyApi.getCompanies(null);
  //   expect(res).toEqual(companies);
  //   expect(res.length).toEqual(2);

  //   render(
  //     <MemoryRouter>
  //       <CompaniesList />
  //     </MemoryRouter>
  //   );
  //   const out = await waitFor(() => screen.findByRole("list"));
  //   expect(out).toHaveTextContent(/arnold/i);
  //   expect(screen.getByText(/companies list/i)).toBeInTheDocument();
  // });
});
