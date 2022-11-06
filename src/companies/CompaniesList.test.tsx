import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import CompaniesList from "./CompaniesList";
import { companies, BASE_URL } from "../testMockData";
import JoblyApi from "../api";

describe("Tests CompaniesList", () => {
  let axiosMock: MockAdapter;
  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });
  it("matches CompaniesList snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows all companies in CompaniesList", async () => {
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

  it("handles search bar in CompaniesList", async () => {
    axiosMock.onGet(`${BASE_URL}/companies`).reply(200, { companies });
    const res = await JoblyApi.getCompanies(null);
    expect(res).toEqual(companies);
    expect(res.length).toEqual(2);

    render(
      <MemoryRouter>
        <CompaniesList />
      </MemoryRouter>
    );

    await waitFor(() => screen.findByRole("list"));

    const input = screen.getByTestId("search-bar-input");
    // const button = screen.getByTestId("search-bar-button");
    // fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "name" } });
    expect(input).toHaveValue("name");
    const form = await screen.findByTestId("search-bar-form");
    fireEvent.submit(form);
    await waitFor(() => screen.findByRole("list"));
    const out = await waitFor(() => screen.findByRole("list"));
    expect(out).toHaveTextContent(/arnold/i);
    expect(screen.getByText(/companies list/i)).toBeInTheDocument();
  });
});
