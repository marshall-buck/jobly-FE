import { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import SearchBar from "../navigation/SearchBar";
import { Company } from "../interfaces";

/**
 * Companies List
 *
 * State
 * list of companies [ {handle, name, description, numEmployees,logoUrl}, ...]
 *
 * App -> Routes -> CompaniesList -> CompanyDetail
 */

function CompaniesList() {
  const [companies, setCompanies] = useState<{
    data: Company[] | null;
    isLoading: boolean;
  }>({ data: null, isLoading: true });

  useEffect(function fetchCompaniesOnLoad() {
    async function fetchCompanies() {
      const companiesResults = await JoblyApi.getCompanies(null);
      setCompanies({
        data: companiesResults,
        isLoading: false,
      });
    }
    fetchCompanies();
  }, []);

  /** handle submit of form set new state */
  async function handleSearch(term: Company["name"]): Promise<void> {
    setCompanies({ ...companies, isLoading: true });
    const companiesResults = await JoblyApi.getCompanies(term);
    setCompanies({ data: companiesResults, isLoading: false });
  }

  if (companies.isLoading) return <i>Loading...</i>;

  return (


      <div className="flex flex-col gap-4 px-4 md:px-12 items-stretch">
      <h1 className="text-3xl font-bold text-center">Companies List</h1>
      <SearchBar handleSearch={handleSearch} />
        {companies?.data?.map((c) => (
          <CompanyCard
            key={c.handle}
            name={c.name}
            logoUrl={c.logoUrl}
            handle={c.handle}
            description={c.description}
          />
        ))}
      </div>

  );
}

export default CompaniesList;
