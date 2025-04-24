import { useEffect, useState } from "react";
import jsonData from "./results.json";
import "./App.css";
import ResultListItem from "./components/ResultListItem/ResultListItem";
import { ResultType } from "./types";

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

  return (
    <>
      <h1>Find and highlight all instances of your searched phrase</h1>
      <div className="search-container">
        <label>Search something</label>
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </div>
      <ul>
        {results
          .filter((result) => result.content.includes(searchInput))
          .map((result) => (
            <ResultListItem result={result} searchInput={searchInput} />
          ))}
      </ul>
    </>
  );
}

export default App;
