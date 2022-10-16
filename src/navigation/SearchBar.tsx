import { useState } from 'react';

interface SearchBarPropsInterface {
  handleSearch: (term: string) => void
}

/** searchBar
 *
 * Props
 * -handleSearch
 *
 * State
 * -formData
 *
 *
 *
 * (JobsList, CompaniesList) -> SearchBar
 */

function SearchBar({ handleSearch }:SearchBarPropsInterface) {
  const [term, setTerm] = useState("");


  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) : void {
    setTerm(evt.target.value);
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    handleSearch(term);
    setTerm("");
  }

  return (
    <form className="form-control self-center" onSubmit={handleSubmit}>
      <div className="input-group">
    <input type="text" placeholder="Search…" className="input input-bordered" value={term} onChange={handleChange}  />
    <button className="btn btn-square">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
    </form>


  );

}

export default SearchBar;

