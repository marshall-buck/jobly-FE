import { useState } from 'react';

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

function SearchBar({ handleSearch }) {
  const [term, setTerm] = useState("");


  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  function handleSubmit(evt) {
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