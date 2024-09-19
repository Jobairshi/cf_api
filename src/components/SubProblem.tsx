interface cfProblemSetStruct {
  contestId: number;
  index: string;
  name: string;
  type: string;
  rating: number;
  tags: string[];
}
export default function SubProblem(props: cfProblemSetStruct) {
  const { contestId, name,index, rating, tags } = props;

  return (
    <>
     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {contestId}
                </th>
                <td className="px-6 py-4 ">
                <a  className="hover:bg-blue-400 py-2 rounded-lg"  href={`https://codeforces.com/problemset/problem/${contestId}/${index}`}>{name}</a>
                </td>
                <td className="px-6 py-4">
                    {index}
                </td>
                <td className="px-6 py-4">
                    {rating}
                </td>

                <td className="px-6 py-4">
                    {
                        tags.join(', ')
                    }
                </td>
            </tr>
      
    </>
  );
}
