import { useEffect, useState } from "react";
import jsonData from "./results.json";
import "./App.css";
import ResultListItem from "./components/ResultListItem/ResultListItem";
import { ResultType } from "./types";
import XIcon from "./components/icons/XIcon/XIcon";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<ResultType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setResults(jsonData.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  function handleResetSearchClick() {
    setSearchInput("");
  }

  const filteredResults = results.filter((result) =>
    result.content.includes(searchInput)
  );

  return (
    <>
      <h1>Find and highlight all instances of your searched phrase.</h1>
      <div className="search-container">
        <label>Search something</label>
        <div className="input-and-reset-container">
          <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <button onClick={handleResetSearchClick} disabled={searchInput === ""}>
            <XIcon />
          </button>
        </div>
      </div>
      {filteredResults.length ? (
        <ul>
          {results
            .filter((result) => result.content.includes(searchInput))
            .map((result) => (
              <ResultListItem result={result} searchInput={searchInput} />
            ))}
        </ul>
      ) : (
        <p className="no-results">No results found</p>
      )}
    </>
  );
}

export default App;
