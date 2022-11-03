import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";
import { Company } from "../interfaces";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";

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
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companyResult = await JoblyApi.getCompanyByHandle(
          handle as string
        );
        setCompany({
          data: companyResult,
          isLoading: false,
        });
      } catch (err) {
        setErrors([err] as never[]);
        setCompany({
          data: null,
          isLoading: false,
        });
      }
    }
    fetchCompanies();
  }, [handle]);

  /**
   * waiting for user data to hydrate
   */

  if (company.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      data-cy="company-detail"
      className="flex flex-col gap-4 px-4 md:px-12 items-stretch md:container mx-auto"
    >
      <h1 className="card-title text-4xl ">{company?.data?.name}</h1>
      <p>{company.data?.description}</p>

      <h2 className="text-2xl ">Available Jobs</h2>

      {errors.length ? (
        <Alert resetErrors={setErrors} type="error" messages={errors} />
      ) : (
        <JobCardList jobs={company?.data?.jobs} />
      )}
    </div>
  );
}

export default CompanyDetail;
