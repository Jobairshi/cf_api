import { Route, Routes } from "react-router-dom";
import Problem_filter from "./component/Problem_filter";
import UserSubmission from "./component/UserSubmission";
import Navbar from "./component/Navbar";
import SearchByTags from "./component/SearchByTags";





export default function App() {
  
  return (
    <>
    <Navbar/>
    <Routes>
      <Route  path="/" element = {<Problem_filter/>}/>
      <Route  path="/user-sub" element = {<UserSubmission/>}/>
      <Route path="/search-by-tag" element = {<SearchByTags/>}/>
    </Routes>
    </>
  );
}
