import axios from "axios";
import { useState, useEffect } from "react";

interface Problem {
  name: string;
  rating: number;
  tags: string[];
  contestId: number;
  index: string;
}

interface TimerState {
  [key: string]: number;
}

const tagsList = [
  "math",
  "greedy",
  "dp",
  "data structures",
  "brute force",
  "constructive algorithms",
  "graphs",
  "sortings",
  "binary search",
  "dfs and similar",
  "trees",
  "strings",
  "number theory",
  "combinatorics",
  "*special",
  "geometry",
  "bitmasks",
  "two pointers",
  "dsu",
  "shortest paths",
  "probabilities",
  "divide and conquer",
  "hashing",
  "games",
  "flows",
  "interactive",
  "matrices",
  "string suffix structures",
  "fft",
  "graph matchings",
  "ternary search",
  "expression parsing",
  "meet-in-the-middle",
  "2-sat",
  "chinese remainder theorem",
  "schedules",
];

function ProblemSetGenerator() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficultyRange, setDifficultyRange] = useState<[number, number]>([
    800, 1200,
  ]);
  const [timers, setTimers] = useState<TimerState>({});
  const [filter, setFilter] = useState<Problem[]>([]);
  const [timeIntervals, setTimeIntervals] = useState<{
    [key: string]: NodeJS.Timeout | null;
  }>({});

  const [revserdis, setrevserdis] = useState<boolean>(true);

  const url = `https://codeforces.com/api/problemset.problems`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await axios.get(url, {});
        const data = promise.data.result.problems;
        setProblems(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("Data fetching successful");
      }
    };
    fetchData();
  }, [url]);

  const generateProblemSet = () => {
    const [minDifficulty, maxDifficulty] = difficultyRange;
    const filteredProblems = problems.filter(
      (problem) =>
        problem.rating >= minDifficulty &&
        problem.rating <= maxDifficulty &&
        selectedTags.every((tag) => problem.tags.includes(tag))
    );
    const sorted = filteredProblems.sort((a: Problem, b: Problem) => {
      if (a.rating > b.rating) return 1;
      else if (a.rating < b.rating) return -1;
      return 0;
    });
    console.log(filteredProblems);
    setrevserdis(false);
    setFilter(sorted);
  };

  const startTimer = (problemId: string) => {
    const startTime = Date.now();

    if (!timeIntervals[problemId]) {
      const interval = setInterval(() => {
        setTimers((prevTimers) => ({
          ...prevTimers,
          [problemId]: (Date.now() - startTime) / 1000,
        }));
      }, 1000);

      setTimeIntervals((prev) => ({ ...prev, [problemId]: interval }));
    }
  };

  const stopTimer = (problemId: string) => {
    if (timeIntervals[problemId]) {
      clearInterval(timeIntervals[problemId]);
      setTimeIntervals((prev) => ({ ...prev, [problemId]: null }));

      console.log(`Time spent on ${problemId}: ${timers[problemId]} seconds`);
    }
  };

  function reverseProblems() {
    const rev = [...filter].sort((a: Problem, b: Problem) => {
      if (a.rating > b.rating) return -1;
      else if (a.rating < b.rating) return 1;
      return 0;
    });
    setFilter(rev);
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold mb-6 text-black">
        Problem Set Generator
      </h2>

      <div className="w-full max-w-2xl p-6 border border-gray-300 rounded-md shadow-sm">
        
        {/* Tags Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-black">Available Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tagsList.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Tags:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter tags separated by commas"
            value={selectedTags.join(", ")}
            onChange={(e) =>
              setSelectedTags(
                e.target.value.split(", ").map((tag) => tag.trim())
              )
            }
          />

          <label className="block text-gray-700 text-sm font-medium mb-2">
            Difficulty Range:
          </label>
          <div className="flex space-x-2 mb-4">
            <input
              type="number"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={difficultyRange[0]}
              onChange={(e) =>
                setDifficultyRange([
                  parseInt(e.target.value),
                  difficultyRange[1],
                ])
              }
            />
            <input
              type="number"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={difficultyRange[1]}
              onChange={(e) =>
                setDifficultyRange([
                  difficultyRange[0],
                  parseInt(e.target.value),
                ])
              }
            />
          </div>

          <div className="flex flex-row gap-3">
            <button
              onClick={generateProblemSet}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-200"
            >
              Generate Problem Set
            </button>
            <button
              onClick={reverseProblems}
              disabled={revserdis}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-200"
            >
              Reverse Problem Set
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Generated Problems</h3>
          <ul className="space-y-4">
            {filter.map((problem) => (
              <li
                key={problem.contestId + problem.index}
                className="p-4 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div className="text-gray-700">
                    <a
                      href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                      target="_blank"
                    >
                      {problem.name} -{" "}
                      <span className="text-sm">Rating: {problem.rating}</span>
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {timers[problem.contestId + problem.index]
                        ? `${Math.floor(
                            timers[problem.contestId + problem.index]
                          )}s`
                        : "0s"}
                    </span>
                    <button
                      onClick={() =>
                        startTimer(problem.contestId + problem.index)
                      }
                      className="bg-black text-white py-1 px-2 rounded-md text-sm hover:bg-gray-900 transition duration-200"
                    >
                      Start Timer
                    </button>
                    <button
                      onClick={() =>
                        stopTimer(problem.contestId + problem.index)
                      }
                      className="bg-red-500 text-white py-1 px-2 rounded-md text-sm hover:bg-red-600 transition duration-200"
                    >
                      Stop Timer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemSetGenerator;
