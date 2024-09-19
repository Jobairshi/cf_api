import axios from "axios";
import { useEffect, useState } from "react";
import UserSubRow from "./UserSubRow";
import ShowSubmissionGraph from "./ShowSubmissionGraph";

interface propsStruct {
  username: string;
}
interface elemStruct {
  verdict: string;
  problem: probStruct;
}
interface probStruct {
  contestId: number;
  index: string;
  name: string;
  rating: number;
  tags: string[];
}
interface userinfoStruct extends probStruct {
  verdict: string;
}
interface dataStruct {
  x: number;
  y: number;
}

export default function RecentSub({ username }: propsStruct) {
  const url = `https://codeforces.com/api/user.status?handle=${username}`;

  const [data, setData] = useState<elemStruct[]>([]);
  const [countProb, setCountProb] = useState<dataStruct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await axios.get(url);
        console.log(promise.data.result);
        setData(promise.data.result);
        return promise.data.result;
      } catch (err) {
        console.log(err);
      } finally {
        console.log("Data fetched!!");
      }
    };

    const awaitFetch = async () => {
      const data = await fetchData();
      const mapper = new Map();
      data.map((elem: elemStruct) => {
        const prob: probStruct = elem.problem;
        if (prob.rating && elem.verdict === "OK") {
          console.log(elem.verdict);
          if (mapper.get(prob.rating)) {
            mapper.set(prob.rating, mapper.get(prob.rating) + 1);
          } else {
            mapper.set(prob.rating, 1);
          }
        }
      });

      const arr: dataStruct[] = [];
      mapper.forEach((elem, key) => {
        arr.push({ x: key, y: elem });
      });
      setCountProb(arr);
    };

    awaitFetch();
  }, [username,url]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow); // strt teke start+ 30

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    console.log(indexOfFirstRow,indexOfLastRow)
    setCurrentPage((curr) => curr - 1);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div>
          <ShowSubmissionGraph data={countProb} />
        </div>
        <div className="relative overflow-x-auto bg-black">
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
                  Verdict
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
              {currentRows.map((elem: elemStruct, key: number) => {
                const prob: probStruct = elem.problem;
                const temp: userinfoStruct = {
                  verdict: elem.verdict,
                  contestId: prob.contestId,
                  index: prob.index,
                  name: prob.name,
                  rating: prob.rating,
                  tags: prob.tags,
                };
                return <UserSubRow key={key} {...temp} />;
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row m-auto gap-32">
          {(indexOfLastRow - 30) >0 ? (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white w-32 rounded-lg"
              onClick={handlePrevPage}
            >
              Previous
            </button>
          ) : (
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white w-32 rounded-lg "
              disabled
            >
              Previous
            </button>
          )}
          {indexOfLastRow < data.length ? (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white w-32 rounded-lg"
              onClick={handleNextPage}
            >
              Next
            </button>
          ) : (
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white w-32 rounded-lg"
              disabled
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
