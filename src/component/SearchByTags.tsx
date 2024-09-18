import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import SubProblem from "./SubProblem";

interface cfProblemSetStruct {
  contestId: number;
  index: string;
  name: string;
  type: string;
  rating: number;
  tags: string[];
}

export default function SearchByTags() {
  const [tag, setTag] = useState<string>("math");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<cfProblemSetStruct[]>([]);
  const [filterData, setfilterData] = useState<cfProblemSetStruct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 30;

  const url = `https://codeforces.com/api/problemset.problems`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await axios.get(url, {});
        setData(promise.data.result.problems);

    //    console.log(promise.data.result.problems);
      } catch (err) {
        console.log(err);
        const msg = (err as Error).message;
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1 className="text-red-500">Error: {error}</h1>;
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filterData.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  // Tags for filtering
  const tags = [
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

  function handleChange(event: MouseEvent<HTMLButtonElement>) {
    const filtered = data.filter((elem: cfProblemSetStruct) => {
      if (
        elem.tags.findIndex((tag) => tag === event.currentTarget.value) !== -1
      ) {
        return true;
      }
    });
    filtered.sort((a:cfProblemSetStruct,b:cfProblemSetStruct)=>{
        if(a.rating < b.rating)
        {
            return -1;
        }
        else if(a.rating > b.rating)
        {
            return 1;
        }
        return 0;
    })
  //  console.log(filtered)
    setfilterData(filtered);
    setTag(event.currentTarget.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="container mx-auto my-8 p-4 flex flex-col gap-10">
        <div className="grid grid-cols-10 gap-5 m-auto">
          {tags.map((btn, key) => (
            <button
              className="border-2 border-blue-100 rounded-lg bg-cyan-400 hover:bg-orange-100"
              key={key}
              value={btn}
              onClick={handleChange}
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Contest ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Index
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((elem: cfProblemSetStruct, key: number) => (
                <SubProblem key={key} {...elem} />
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleNextPage}
              disabled={indexOfLastRow >= filterData.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
