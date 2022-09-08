import { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';
import SearchBar from '../SearchBar';




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



  /** handle submit of form set new state */
  async function handleSearch(term) {

    setCompanies({ ...companies, isLoading: true });
    const companiesResults = await JoblyApi.getCompanies(term);
    setCompanies({ data: companiesResults, isLoading: false });

  }

  if (companies.isLoading) return <i>Loading...</i>;


  return (
    <div>
      <h1>Companies List</h1>
      <SearchBar handleSearch={handleSearch} />

      {companies.data.map(c => (

        <CompanyCard key={c.handle}
          name={c.name}
          logoUrl={c.logoUrl}
          handle={c.handle}
          description={c.description} />
      ))}

    </div>

  );


}


export default CompaniesList;