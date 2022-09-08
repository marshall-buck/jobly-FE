import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN



  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle.
   * returns company object
   *  {handle, name, description, numEmployees, logoUrl,
   *                        jobs:[ {is, title, salary, equity}, ...], ...}
   */

  static async getCompanyByHandle(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get companies list either by all of filtered.
   * returns array of company objects
   *  [ {handle, name, description, numEmployees,logoUrl}, ...]
   */

  static async getCompanies(name) {
    const res = await this.request(`companies`, { name });

    return res.companies;
  }


  /**Get all jobs
   *
   * returns array pf job objects
   * [{id, title,salary,equity,companyHandle,companyName }, ...]
   */

  static async getJobs(title) {
    const res = await this.request(`jobs`, { title });
    return res.jobs;
  }

  /** Takes signup form data
   *  sends form data to backend registration endpoint
   *  returns JWT
   */

  static async handleSignup(formData) {
    let res = await this.request(`auth/register`, formData, 'POST');

    return res.token;
  }
  /** logs in user
   * -returns token
   */
  static async loginUserApi(formData) {
    const res = await this.request(`auth/token`, formData, 'POST');

    return res.token;
  }


  /** gets all user data
   * receives user data
   */
  static async getUserData(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * edit profile
   * {firstName, lastName, email}
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   */
  static async handleEditForm(formData) {
    const { username, firstName, lastName, email } = formData;


    const res = await this.request(
      `users/${username}`, { firstName, lastName, email }, 'PATCH');
      console.log('response',res);

      return res;
  }






}

export default JoblyApi;