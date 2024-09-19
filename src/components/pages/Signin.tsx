import axios from "axios";
import { FormEvent, useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  // function formdata(Formdata: FormData) {
  //   const names  = Formdata.get("name");
  //   console.log(names);
  //   setName((names as string));

  //   const password = Formdata.get("password");
  //   setPassword((password as string))
  // }
  const url = `https://codeforces.com/api/user.info?handles=${name}&checkHistoricHandles=false`;

  if (error) {
    alert(error);
    window.location.reload();
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  const formdatas = new FormData(e.currentTarget);
    //   // console.log(name);
    //   // console.log(password)

    //   formdata(formdatas);
    const fetchData = async () => {
      try {
        const promise = await axios.get(url, {});
        console.log(promise.data)
        alert('user found')
        localStorage.setItem('name',name);
        navigate('/user-sub')
        return promise.status;
      } catch (err) {
        const msg = (err as Error).message;
        setError(msg);
      } finally {
        console.log("user loign or errror");
      }
    };
   fetchData();
   
   
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center mb-6">Sign in</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              user name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right mt-2">
              <a
                href="#forgot-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
        </form>
        <div className="text-center my-4">
          <p>
            Don't have an account?{" "}
            <a href="#signup" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center shadow-sm hover:bg-gray-50">
            <FaGoogle className="text-red-500 mr-2" />
            Sign in with Google
          </button>
          <button className="bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center shadow-sm hover:bg-gray-50">
            <FaFacebook className="text-blue-600 mr-2" />
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
