/**
 * JobCard
 *
 * props:
 *  - Job {id, title, salary,equity, companyHandle,companyName};
 *
 * App => RoutesList => JobList => JobCard
 */

import { Link } from "react-router-dom";
import { Job } from "../interfaces";

function JobCard({ title, salary, equity, companyName, companyHandle }: Omit<Job, "id">) {
  return (
    <div className="card md:card-side bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Salary: {salary ? salary : "Not Listed"}</p>
        <p>Equity: {equity ? equity : "Not Listed"}</p>
        <div className="card-actions justify-end">
        <Link to={`/companies/${companyHandle}`}>
        <p className="text-right text-secondary" >{companyName}</p>
      </Link>


        </div>
      </div>
    </div>
  );
}

export default JobCard;


