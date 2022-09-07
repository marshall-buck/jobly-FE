
/**
 * JobCard
 *
 * props:
 *  - Job {id, title, salary,equity, companyHandle,companyName};
 *
 * App => RoutesList => JobList => JobCard
 */
// TODO: check if we need id companyHandle. Ask if we should/could add key here
function JobCard({id, title, salary,equity, companyHandle,companyName}){


  return(

      <div>
        <h2>{title}</h2>
        {companyName && <h3>{companyName}</h3>}
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
      </div>
  )
}

export default JobCard;