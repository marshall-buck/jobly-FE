import { useState, useEffect } from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';


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

      {companies.data.map(c  => (

<CompanyCard key={c.handle}
             name={c.name}
             logoUrl={c.logoUrl}
             handle={c.handle}
             description={c.description}/>
))}

    </div>

  );


}


export default CompaniesList;