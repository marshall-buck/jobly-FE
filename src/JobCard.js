
/**
 * JobCard
 *
 * props:
 *  - Job {id, title, salary,equity, companyHandle,companyName};
 *
 * App => RoutesList => JobList => JobCard
 */

function JobCard({ title, salary, equity, companyName }) {


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