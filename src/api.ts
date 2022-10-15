import axios from "axios";

import {
  Company,
  FormEditUser,
  FormLoginUser,
  FormSignupUser,
  Job,
  User,
} from "./interfaces";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static token: string | null = null;

  static async request(endpoint: string, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle.
   * returns company object
   *  {handle, name, description, numEmployees, logoUrl,
   *                        jobs:[ {id, title, salary, equity}, ...], ...}
   */

  static async getCompanyByHandle(handle: string): Promise<Company> {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get companies list either by all or filtered.
   * returns array of company objects
   *  [ {handle, name, description, numEmployees,logoUrl}, ...]
   */

  static async getCompanies(name: string | null): Promise<Company[]> {
    const res = await this.request(`companies`, { name });

    return res.companies;
  }

  /**Get all jobs
   *
   * returns array of job objects
   * [{id, title,salary,equity,companyHandle,companyName }, ...]
   */

  static async getJobs(title: string | null): Promise<Job[]> {
    const res = await this.request(`jobs`, { title });
    return res.jobs;
  }

  /** Takes signup form data
   *  sends form data to backend registration endpoint
   *  returns JWT
   */

  static async handleSignup(formData: FormSignupUser): Promise<string> {
    let res = await this.request(`auth/register`, formData, "POST");

    return res.token;
  }
  /** logs in user
   * -returns token
   */
  static async loginUserApi(formData: FormLoginUser): Promise<string> {
    const res = await this.request(`auth/token`, formData, "POST");

    return res.token;
  }

  /** gets all user data
   * receives user data
   */
  static async getUserData(username: User["username"]): Promise<User> {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * edit profile
   * {firstName, lastName, email}
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   */
  static async handleEditForm(formData: FormEditUser): Promise<User> {
    const { username, firstName, lastName, email } = formData;

    const res = await this.request(
      `users/${username}`,
      { firstName, lastName, email },
      "PATCH"
    );

    return res.user;
  }
}

export default JoblyApi;
