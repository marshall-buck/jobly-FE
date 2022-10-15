
/**
 * JobCard
 *
 * props:
 *  - Job {id, title, salary,equity, companyHandle,companyName};
 *
 * App => RoutesList => JobList => JobCard
 */

import { Job } from "../interfaces";

function JobCard({title, salary, equity, companyName }: Omit<Job, "id">) {


  return (

    <div>
      <h2>{title}</h2>
      {companyName && <h3>{companyName}</h3>}
      <p>Salary: {salary ? salary : 'Not Listed'}</p>
      <p>Equity: {equity ? equity : 'Not Listed'}</p>
    </div>
  );
}

export default JobCard;