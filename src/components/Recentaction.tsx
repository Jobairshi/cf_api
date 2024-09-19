import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

interface RecentAction {
  comment?: {
    commentatorHandle: string;
    text: string;
  };
  blogEntry?: {
    authorHandle: string;
    title: string;
    id: number;
  };
  timeSeconds: number;
}

const NewsSection = () => {
  const [news, setNews] = useState<RecentAction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://codeforces.com/api/recentActions?maxCount=10"
        );
        setNews(response.data.result);
      } catch (err) {
        const msg = (err as Error).message;
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatTime = (timeSeconds: number) => {
    const date = new Date(timeSeconds * 1000);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="text-center text-lg">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Recent News from Codeforces
      </h2>
      <ul>
        {news.map((action, index) => (
          <li
            key={index}
            className="mb-6 p-4 border-b border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-lg"
          >
            {action.comment ? (
              <div className="hover:bg-gray-50 rounded-lg p-4 transition-colors duration-300">
                <strong className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300">
                   <span>
                   <a
                   target="_blank" 
                   href={`https://codeforces.com/comments/with/${action.comment.commentatorHandle}`}>{action.comment.commentatorHandle} commented:</a>
                    </span> 
                </strong>
                <div
                  className="mt-2 text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(action.comment.text),
                  }}
                />
              </div>
            ) : action.blogEntry ? (
              <div className="hover:bg-gray-50 rounded-lg p-4 transition-colors duration-300">
                <strong className="text-lg text-green-600 hover:text-green-800 transition-colors duration-300">
                  Blog post by {action.blogEntry.authorHandle}:
                </strong>
                <a
                  href={`https://codeforces.com/blog/entry/${action.blogEntry.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-300"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(action.blogEntry.title),
                  }}
                />
              </div>
            ) : null}
            <small className="block mt-2 text-gray-500">
              {formatTime(action.timeSeconds)}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;




