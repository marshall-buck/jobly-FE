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
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

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

  /** Get details on a company by handle. */

  static async getCompanyByHandle(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on a company by handle. */
  //TODO: make sure this works
  static async getCompanies(nameLike=null) {
    let res;
    if (!nameLike){
      res = await this.request("companies/");
    } else {
      res = await this.request(`companies/?=name${nameLike}`);
    }
    return res.company;
  }



  // /**Get all companies */

  // static async getCompanies() {
  //   let res = await this.request(`companies/`);
  //   return res.companies;
  // }

  /**Get all jobs */
  //TODO: make sure this works
  static async getJobs(title=null) {
    let res;
    if (!title){
      res = await this.request("jobs/");
    } else {
      res = await this.request(`jobs/?title=${title}`);
    }
    return res.jobs;
  }

//   /**Get list of jobs matching search term */

//   static async getJobsByTerm(term) {
//     let res = await this.request(`jobs/?title=${term}`);
//     return res.jobs;
//   }
}

export default JoblyApi;