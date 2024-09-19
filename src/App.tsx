import { Route, Routes } from "react-router-dom";
import Problem_filter from "./components/pages/Problem_filter";
import UserSubmission from "./components/pages/UserSubmission";
import Navbar from "./components/Navbar";
import SearchByTags from "./components/pages/SearchByTags";
import SignIn from "./components/pages/Signin";





export default function App() {
  
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element = {<SignIn/>}/>
      <Route  path="/problem-rating" element = {<Problem_filter/>}/>
      <Route  path="/user-sub" element = {<UserSubmission/>}/>
      <Route path="/search-by-tag" element = {<SearchByTags/>}/>
      
    </Routes>
    </>
  );
}
