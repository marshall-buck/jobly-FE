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
    <form onSubmit={handleSubmit}>
      <input value={term} onChange={handleChange} />
      <button>Search!</button>
    </form>


  );

}

export default SearchBar;