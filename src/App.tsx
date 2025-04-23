import { useEffect, useState } from "react";
import jsonData from "./results.json";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [results, setResults] = useState<
    { id: number; content: string; animal: string }[]
  >([]);

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
      <h1>Text search</h1>
      <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.content}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
