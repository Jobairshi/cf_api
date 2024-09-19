import {
  
  MouseEvent,
 
  useEffect,
  useState,
} from "react";
import useFetch from "../useFetch";
import SubProblem from "./SubProblem";
interface cfProblemSetStruct {
  contestId: number;
  index: string;
  name: string;
  type: string;
  rating: number;
  tags: string[];
}

export default function Problem_filter() {
  //   const baseUrl = "https://codeforces.com/api/problemset.problems?problemsetName=acmsguru"
  const url = `https://codeforces.com/api/problemset.problems`;
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data, loading, error } = useFetch(url, options);
  const [datas, setDatas] = useState<cfProblemSetStruct[]>([]);
  const [rating, setTrating] = useState<number>(0);
  useEffect(() => {
    const temp = data.filter(
      (rate: cfProblemSetStruct) => rating === rate.rating
    );
    console.log(temp);
    setDatas(temp);
  }, [rating]);
  if (loading === true) {
    return <h1> loading... </h1>;
  }
  if (error) {
    return <h1> ERRR: {error} </h1>;
  }

  const codeforcesRatings = [
    800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
    2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,3200,3400
  ];

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const rate = event.currentTarget.value;
    //   console.log(rate)
    setTrating(Number(rate));
    //   console.log(rating)
    // const temp = data.filter((rate)=>rating===Number(rate))
  }
  return (
    <>
      <div className="flex flex-col gap-10 ">
        <div className="flex flex-row gap-5 m-auto">
          {codeforcesRatings.map((btn, key) => {
            return (
              <button className="border-2 border-blue-100 rounded-lg bg-cyan-400 p-3 hover:bg-orange-100 " key={key} value={btn} onClick={handleClick}>
                {btn}
              </button>
            );
          })}
      
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Contest id
                </th>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((elem: cfProblemSetStruct, key) => {
                return <SubProblem key={key} {...elem} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
