import { useEffect, useRef, useState } from "react";
import axios from "axios";
import RecentSub from "./RecentSub";


interface userStruct {
  avatar: string;
  city: string;
  contribution: number;
  country: string;
  email: string;
  firstName: string;
  friendOfCount: number;
  handle: string;
  lastName: string;
  lastOnlineTimeSeconds: number | string;
  maxRank: string;
  maxRating: number;
  organization: string;
  rank: string;
  rating: number;
  registrationTimeSeconds: number;
  titlePhoto: string;
}

export default function UserSubmission() {
  const [name, setName] = useState("Jobair_uddin");
  const [data, setData] = useState<userStruct[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userRef = useRef<HTMLInputElement>(null);
  const url = `https://codeforces.com/api/user.info?handles=${name}&checkHistoricHandles=false`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data..");
        const promise = await axios.get(url, {});
        setData(promise.data.result);
      } catch (err) {
        const msg = (err as Error).message;
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const [showSub, setShowSub] = useState(false);

  if (loading) {
    return <h1 className="text-center text-2xl text-blue-600">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-red-600 text-center text-xl">Error: {error}</h1>;
  }

  function handleClick() {
    console.log(showSub);
    setShowSub(!showSub);
  }

  function getInfo() {
    const username = userRef.current?.value || "";
    setName(username);
    console.log(username);
  }
  // function conditional() {
  //   if (showSub) {
  //     return <RecentSub username={name} />;
  //   } else {
  //     <p />;
  //   }
  // }

  return (
    <>
      <div className="container mx-auto my-8 p-4 flex flex-col gap-10" >
        <div className="flex flex-col items-center gap-4 ">
          <div className="flex flex-row gap-4">
            <input
              className="border-2 border-black rounded-lg p-2"
              type="text"
              ref={userRef}
              placeholder="Enter Codeforces Handle"
            />
            <button
              onClick={getInfo}
              className="border-2 border-black p-2 rounded-lg bg-cyan-300 hover:bg-cyan-400 transition duration-300"
            >
              Show
            </button>
          </div>
          {/* <Link onClick={handleClick}
            className="border-2 border-black p-2 rounded-lg bg-green-300 hover:bg-green-400 transition duration-300"
            to="/recent-submision"
          >
            {" "}
            show recent submission{" "}
          </Link> */}
          <button
            onClick={handleClick}
            className="border-2 border-black p-2 rounded-lg bg-green-300 hover:bg-green-400 transition duration-300"
          >
            {" "}
            show recent submission{" "}
          </button>

          {data.length > 0 && (
            <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg shadow-cyan-400 rounded-lg p-6 text-center mt-8 hover:bg-green-300">
              <img
                src={data[0].titlePhoto}
                alt={`${data[0].firstName} ${data[0].lastName}`}
                className="rounded-full mx-auto w-24 h-24 border-4 border-cyan-300"
              />
              <h1 className="text-2xl font-bold text-cyan-500 mt-4">
                {data[0].firstName} {data[0].lastName}
              </h1>
              <h2 className="text-gray-600 text-lg">
                @{data[0].handle} | {data[0].organization}
              </h2>
              <div className="mt-4">
                <p>
                  <span className="font-semibold text-gray-700">Rank: </span>
                  {data[0].rank} | {data[0].maxRank}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Rating: </span>
                  {data[0].rating} (Max: {data[0].maxRating})
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Country: </span>
                  {data[0].country} | {data[0].city}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Contribution:{" "}
                  </span>
                  {data[0].contribution}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Friends Count:{" "}
                  </span>
                  {data[0].friendOfCount}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Email: </span>
                  {data[0].email}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div ><RecentSub username={name} /></div>
      </div>
    </>
  );
}
