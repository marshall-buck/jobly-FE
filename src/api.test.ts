// index.test.js
import JoblyApi from "./api";
import axios from "axios";
import {
  companies,
  company,
  filteredResults,
  user,
  editUser,
  jobs,
  BASE_URL,
} from "./testMockData";
import MockAdapter from "axios-mock-adapter";

describe("Tests api calls", () => {
  let axiosMock: MockAdapter;
  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });
  it("returns list of companies", async () => {
    axiosMock.onGet(`${BASE_URL}/companies`).reply(200, { companies });
    const res = await JoblyApi.getCompanies(null);
    expect(res).toEqual(companies);
    expect(res.length).toEqual(2);
  });

  it("handles filter", async () => {
    axiosMock
      .onGet(`${BASE_URL}/companies`)
      .reply(200, { companies: filteredResults });
    const res = await JoblyApi.getCompanies("ander");
    expect(res).toEqual(filteredResults);
  });

  it("returns 1 company by handle", async () => {
    axiosMock
      .onGet(`${BASE_URL}/companies/anderson-arias-morrow`)
      .reply(200, { company });
    const res = await JoblyApi.getCompanyByHandle("anderson-arias-morrow");
    expect(res).toEqual(company);
    expect(res.handle).toContain("anderson-arias-morrow");
  });

  it("handles sign up", async () => {
    axiosMock
      .onPost(`${BASE_URL}/auth/register`)
      .reply(201, { token: "string" });
    const res = await JoblyApi.handleSignup(user);
    expect(res).toEqual("string");
  });

  it("handles login", async () => {
    axiosMock.onPost(`${BASE_URL}/auth/token`).reply(200, { token: "string" });
    const res = await JoblyApi.loginUserApi({
      username: user.username,
      password: user.password,
    });
    expect(res).toEqual("string");
  });

  it("handles editing user", async () => {
    axiosMock.onPatch(`${BASE_URL}/users/testuser`).reply(200, {
      user: user,
    });
    const res = await JoblyApi.handleEditForm(editUser);
    expect(res).toEqual(user);
  });

  it("gets user data", async () => {
    axiosMock.onGet(`${BASE_URL}/users/testuser`).reply(200, { user });
    const res = await JoblyApi.getUserData(user.username);
    expect(res).toEqual(user);
  });

  it("gets jobs", async () => {
    axiosMock.onGet(`${BASE_URL}/jobs`).reply(200, { jobs });
    const res = await JoblyApi.getJobs(null);
    expect(res).toEqual(jobs);
  });

  it("handles error", async () => {
    axiosMock.onGet(`${BASE_URL}/jobs`).networkError();
    let error;
    try {
      await JoblyApi.getJobs(null);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(["API ERROR , Error: Network Error"]);
  });
});
