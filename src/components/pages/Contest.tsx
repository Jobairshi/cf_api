import axios from "axios";
import { useEffect, useState } from "react";

interface contestStruct {
  id: number;
  name: string;
  type: string;
  phase: string;
  frozen: true;
  durationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
}

export default function Contest() {
  const [data, setData] = useState<contestStruct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const url = "https://codeforces.com/api/contest.list";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await axios.get(url, {});
        setData(promise.data.result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  function formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  function formatStartTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const isNextDisabled = currentItems.length < itemsPerPage;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Duration</th>
            <th className="p-2 border-b">Start Time</th>
            <th className="p-4 border-b">Register</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((elem, key: number) => {
            if (elem.phase === "BEFORE") {
              return (
                <tr
                  key={key}
                  className="hover:bg-blue-200 transition-all duration-300 ease-in-out"
                >
                  <td className="p-2 border-b">{elem.id}</td>
                  <td className="p-2 border-b">{elem.name}</td>
                  <td className="p-2 border-b">
                    {formatDuration(elem.durationSeconds)}
                  </td>
                  <td className="p-2 border-b">
                    {formatStartTime(elem.startTimeSeconds)}
                  </td>
                  <td className="p-4 border-b">
                    <a
                      className="text-blue-500 border-2 rounded-lg p-2 bg-green-200 hover:bg-green-300 transition-all transform hover:scale-105 hover:shadow-lg hover:underline"
                      href={`https://codeforces.com/contestRegistration/${elem.id}`}
                      target="_blank"
                    >
                      Register
                    </a>
                  </td>
                </tr>
              );
            } else if (elem.phase === "CODING") {
              return (
                <tr
                  key={key}
                  className="hover:bg-blue-200 transition-all duration-300 ease-in-out"
                >
                  <td className="p-2 border-b">{elem.id}</td>
                  <td className="p-2 border-b">{elem.name}</td>
                  <td className="p-2 border-b">
                    {formatDuration(elem.durationSeconds)}
                  </td>
                  <td className="p-2 border-b">
                    {formatStartTime(elem.startTimeSeconds)}
                  </td>
                  <td className="p-4 border-b">
                    <a
                      className="text-blue-500 border-2 rounded-lg p-2 bg-yellow-100 hover:bg-yellow-200 transition-all transform hover:scale-105 hover:shadow-lg hover:underline"
                      href="#"
                    >
                      Coming Soon
                    </a>
                  </td>
                </tr>
              );
            } else if (elem.phase === "FINISHED") {
              return (
                <tr
                  key={key}
                  className="hover:bg-blue-200 transition-all duration-300 ease-in-out"
                >
                  <td className="p-2 border-b">{elem.id}</td>
                  <td className="p-2 border-b">{elem.name}</td>
                  <td className="p-2 border-b">
                    {formatDuration(elem.durationSeconds)}
                  </td>
                  <td className="p-2 border-b">
                    {formatStartTime(elem.startTimeSeconds)}
                  </td>
                  <td className="p-4 border-b">
                    <a
                      className="text-blue-500 border-2 rounded-lg p-2 bg-red-400 hover:bg-red-200 transition-all transform hover:scale-105 hover:shadow-lg hover:underline"
                      href={`https://codeforces.com/contest/${elem.id}/standings`}
                      target="_blank"
                    >
                      Check standing
                    </a>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`p-2 bg-blue-500 text-white rounded-lg ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={isNextDisabled}
          className={`p-2 bg-blue-500 text-white rounded-lg ${
            isNextDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
