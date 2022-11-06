import { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";
import SearchBar from "../navigation/SearchBar";
import { Job } from "../interfaces";
import LoadingSpinner from "../common/LoadingSpinner";

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
  const [jobs, setJobs] = useState<{ data: Job[] | null; isLoading: boolean }>({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobsResults = await JoblyApi.getJobs(null);
        setJobs({
          data: jobsResults,
          isLoading: false,
        });
      } catch (err) {
        setJobs({
          data: null,
          isLoading: false,
        });
      }
    }
    fetchJobs();
  }, []);

  /** handle submit of form set new state */
  async function handleSearch(term: string) {
    setJobs({ ...jobs, isLoading: true });
    const jobsResults = await JoblyApi.getJobs(term);
    setJobs({ data: jobsResults, isLoading: false });
  }

  if (jobs.isLoading) return <LoadingSpinner />;

  return (
    <div
      role="list"
      className="flex flex-col gap-4 px-4 md:px-12  md:container  mx-auto"
    >
      <h1 className="text-3xl font-bold text-center">Jobs List</h1>
      <SearchBar handleSearch={handleSearch} />

      {jobs.data ? (
        <>
          <JobCardList jobs={jobs.data} />
        </>
      ) : (
        <h1>No job for you, please try again</h1>
      )}
    </div>
  );
}

export default JobsList;
