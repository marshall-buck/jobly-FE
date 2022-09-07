import { useState, useEffect } from 'react';
import JoblyApi from './api';


/**
 * Companies List
 *
 * State
 * list of companies [ {handle, name, description, numEmployees,logoUrl}, ...]
 *
 * App -> Routes -> CompaniesList -> CompanyDetail
 */

function CompaniesList() {
  const [companies, setCompanies] = useState({ data: null, isLoading: true });

  useEffect(function fetchCompaniesOnLoad() {
    async function fetchCompanies() {
      const companiesResults = await JoblyApi.getCompanies();
      setCompanies({
        data: companiesResults,
        isLoading: false
      });
    }
    fetchCompanies();
  }, []);


  if (companies.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <h1>Companies List</h1>

    </div>

  );


}


export default CompaniesList;