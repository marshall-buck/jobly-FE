import JobCard from "./JobCard";
/**
 *  JobCardList
 *
 * props:
 * list of jobs [{id, title,salary,equity,companyHandle,companyName }, ...]
 *
 *  App => RoutesList => JobsList => JobCardList => JobCard
 *
*/

function JobCardList({ jobs }) {



  return (
    <div>
      {jobs.map(j => (
        j.companyName
          ?
          <JobCard key={j.id} title={j.title}
            salary={j.salary}
            equity={j.equity}
            companyName={j.companyName} />
          :
          <JobCard key={j.id} title={j.title}
            salary={j.salary}
            equity={j.equity} />

      ))}
    </div>
  );
}

export default JobCardList;