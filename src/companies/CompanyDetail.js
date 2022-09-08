import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCardList from '../jobs/JobCardList';

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
  const { handle } = useParams();

  const [company, setCompany] = useState({ data: null, isLoading: true });

  useEffect(function fetchCompaniesOnLoad() {
    async function fetchCompanies() {

      const companyResult = await JoblyApi.getCompanyByHandle(handle);
      setCompany({
        data: companyResult,
        isLoading: false
      });
    }
    fetchCompanies();
  }, []);


  if (company.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <h1>{company.data.name}</h1>
      <p>{company.data.description}</p>
      {
        <JobCardList jobs={company.data.jobs} />
      }

    </div>

  );

}


export default CompanyDetail;