import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";
import { Company } from "../interfaces";

/**
 * Company  Detail
 *

 * State
 *  {handle, name, description, numEmployees, logoUrl,
  *                        jobs:[ {id, title, salary, equity}, ...], ...}
  *
  * App -> Routes -> CompanyDetail -> JobsList
 */

function CompanyDetail() {
  const [company, setCompany] = useState<{
    data: Company | null;
    isLoading: boolean;
  }>({ data: null, isLoading: true });
  const { handle } = useParams<Company["handle"]>();

  useEffect(function fetchCompaniesOnLoad() {
    async function fetchCompanies() {
      const companyResult = await JoblyApi.getCompanyByHandle(handle as string);
      setCompany({
        data: companyResult,
        isLoading: false,
      });
    }
    fetchCompanies();
  });

  if (company.isLoading) return <i>Loading...</i>;

  return (
    <div className="flex flex-col gap-4 px-4 md:px-12 items-stretch md:container mx-auto">
      <h1 className="card-title text-4xl text-primary-content">
        {company?.data?.name}
      </h1>
      <p>{company.data?.description}</p>

      <h2 className="text-2xl text-primary-content">Available Jobs</h2>

      <JobCardList jobs={company?.data?.jobs} />
    </div>
  );
}

export default CompanyDetail;
