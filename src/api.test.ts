// index.test.js
import JoblyApi from "./api";
import axios from "axios";
import { companies, company, filteredResults, user } from "./testUtils";
import MockAdapter from "axios-mock-adapter";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const axiosMock: MockAdapter  = new MockAdapter(axios);

// jest.mock("JoblyApi");
// const axiosMock: MockAdapter  = new MockAdapter(axios);
// const mockedJobly = JoblyApi as jest.Mocked<typeof JoblyApi>;

describe("Tests api calls", () => {


  it("returns list of companies", async () => {

    axiosMock.onGet(`${BASE_URL}/companies`).reply(200, { companies });

    const res = await JoblyApi.getCompanies(null);
    expect(res).toEqual(companies);
    expect(res.length).toEqual(2);
  });

  it("handles filter", async () => {

    axiosMock.onGet(`${BASE_URL}/companies`).reply(200, {companies: filteredResults})
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
    axiosMock.onPost(`${BASE_URL}/auth/register`).reply(201, {token: "string"})

    const res = await JoblyApi.handleSignup(user);


    expect(res).toEqual("string");
  });


});
