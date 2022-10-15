import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCardList from '../jobs/JobCardList';
import { Company } from '../interfaces';

/**
 * Company  Detail
 *

 * State
 *  {handle, name, description, numEmployees, logoUrl,
  *                        jobs:[ {is, title, salary, equity}, ...], ...}
  *
  * App -> Routes -> CompanyDetail -> JobsList
 */

function CompanyDetail() {

  const [company, setCompany] = useState<{data: Company | null, isLoading: boolean}>({ data: null, isLoading: true });
  const { handle } = useParams<Company["handle"]>()

  useEffect(function fetchCompaniesOnLoad() {
    async function fetchCompanies() {

      const companyResult = await JoblyApi.getCompanyByHandle(handle as string);
      setCompany({
        data: companyResult,
        isLoading: false
      });
    }
    fetchCompanies();
  });


  if (company.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <h1>{company?.data?.name}</h1>
      <p>{company.data?.description}</p>
      {
        <JobCardList jobs={company?.data?.jobs} />
      }

    </div>

  );

}


export default CompanyDetail;