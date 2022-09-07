import { useState, useEffect } from 'react';
import JoblyApi from './api';
import JobCardList from "./JobCardList";

/**
 * Jobs List
 *
 * State
 * list of jobs [{id, title,salary,equity,companyHandle,companyName }, ...]
 *
 * App -> Routes -> JobsList -> JobCard
 *
 */

function JobsList() {
  const [jobs, setJobs] = useState({ data: null, isLoading: true });

  useEffect(function fetchCompaniesOnLoad() {
    async function fetchJobs() {
      const jobsResults = await JoblyApi.getJobs();
      setJobs({
        data: jobsResults,
        isLoading: false
      });
    }
    fetchJobs();
  }, []);


  if (jobs.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <h1>Jobs List</h1>
      <JobCardList jobs={jobs.data}/>
    </div>

  );
}


export default JobsList;