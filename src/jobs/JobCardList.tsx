import { Job } from "../interfaces";
import JobCard from "./JobCard";

interface JobCardListPropsInterface {
  jobs: Job[] | null | undefined
}
/**
 *  JobCardList
 *
 * props:
 * list of jobs [{id, title,salary,equity,companyHandle,companyName }, ...]
 *
 *  App => RoutesList => JobsList => JobCardList => JobCard
 *
*/

function JobCardList({ jobs }:JobCardListPropsInterface) {



  return (
    <>
      {jobs?.map((j) => (
        <JobCard key={j.id}  title={j.title}
          salary={j.salary}
          equity={j.equity}
          companyName={j.companyName}
          companyHandle={j.companyHandle} />

      ))}
    </>
  );
}

export default JobCardList;