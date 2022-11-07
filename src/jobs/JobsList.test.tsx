import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import JoblyApi from "../api";
import { BASE_URL, jobs } from "../testMockData";
import JobsList from "./JobsList";

describe("Tests JobsList", () => {
  let axiosMock: MockAdapter;
  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });
  it("matches JobsList snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows all jobs in JobsList", async () => {
    axiosMock.onGet(`${BASE_URL}/jobs`).reply(200, { jobs });
    const res = await JoblyApi.getJobs(null);
    expect(res).toEqual(jobs);
    expect(res.length).toEqual(3);

    render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );

    const out = await waitFor(() => screen.findByRole("list"));
    expect(out).toHaveTextContent(/Conservator/i);
    expect(screen.getByText(/jobs list/i)).toBeInTheDocument();
  });

  it("render  error", async () => {
    axiosMock.onGet(`${BASE_URL}/jobs"`).networkError();

    let error;
    try {
      await JoblyApi.getJobs(null);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual([
      "API ERROR , Error: Request failed with status code 404",
    ]);

    render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );

    const out = await waitFor(() =>
      screen.findByText("No job for you, please try again")
    );

    expect(out).toBeInTheDocument();
    expect(out).not.toHaveTextContent(/Conservator/i);
  });

  it("handles search bar in JobsList", async () => {
    axiosMock.onGet(`${BASE_URL}/jobs`).reply(200, { jobs });
    const res = await JoblyApi.getJobs(null);
    expect(res).toEqual(jobs);
    expect(res.length).toEqual(3);
    render(
      <MemoryRouter>
        <JobsList />
      </MemoryRouter>
    );

    await waitFor(() => screen.findByRole("list"));

    const form = screen.getByTestId("search-bar-form");
    const input = screen.getByTestId("search-bar-input");
    const button = screen.getByTestId("search-bar-button");
    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "form submit" } });
    expect(input).toHaveValue("form submit");

    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "engineer" } });

    fireEvent.submit(form, { key: "Enter", charCode: 13 });
    expect(input).toHaveValue("engineer");
  });
});
