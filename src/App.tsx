import { Route, Routes } from "react-router-dom";
import Problem_filter from "./components/Problem_filter";
import UserSubmission from "./components/UserSubmission";
import Navbar from "./components/Navbar";
import SearchByTags from "./components/SearchByTags";





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
