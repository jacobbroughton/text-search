import { ResultType } from "../../types";
import "./ResultListItem.css";

const ResultListItem = ({
  result,
  searchInput,
}: {
  result: ResultType;
  searchInput: string;
}) => {
  const matchingPairsOfIndexes = [];

  let startingIndex: number = -1;
  let endingIndex: number = -1;
  let searchInputIndex: number = 0;

  for (let i = 0; i < result.content.length; i++) {
    const str: string = result.content;
    if (startingIndex === -1 && str[i] === searchInput[0]) {
      startingIndex = i;
    }

    if (
      startingIndex !== -1 &&
      endingIndex !== -1 &&
      endingIndex - startingIndex + 1 === searchInput.length
    ) {
      matchingPairsOfIndexes.push([startingIndex, endingIndex]);
      startingIndex = -1;
      endingIndex = -1;
      searchInputIndex = 0;
      continue;
    }

    if (startingIndex !== -1 && str[i] !== searchInput[searchInputIndex]) {
      startingIndex = -1;
      endingIndex = -1;
      searchInputIndex = 0;
      continue;
    }

    const matchingSoFar = startingIndex !== -1;
    const lettersMatch = str[i] === searchInput[searchInputIndex];

    if (matchingSoFar && lettersMatch) {
      endingIndex = i;
      searchInputIndex += 1;
    }
  }

  console.log(matchingPairsOfIndexes);

  const highlightedIndexHashMap: { [key: string]: string } = {};

  for (let i = 0; i < matchingPairsOfIndexes.length; i++) {
    let indexCounter = matchingPairsOfIndexes[i][0];

    while (indexCounter <= matchingPairsOfIndexes[i][1]) {
      highlightedIndexHashMap[`${indexCounter}`] = "highlighted";
      indexCounter += 1;
    }
  }

  const resultsCount = matchingPairsOfIndexes.length;
  console.log(resultsCount);

  return (
    <li key={result.id} className="result-list-item">
      {result.content.split("").map((character, i) => {
        return <span className={`${highlightedIndexHashMap[i] || ""}`}>{character}</span>;
      })}
      {resultsCount > 0 && <span className="results-count">{resultsCount}</span>}
    </li>
  );
};

export default ResultListItem;
