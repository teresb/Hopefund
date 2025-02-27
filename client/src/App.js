import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './components/Auth/login'
import SignUp from './components/Auth/signup'
import Fundraise from './components/Fundraise/Fundraise'
import Search from './pages/Search'
import Admin from './components/Admin/Admin'
import Fundraiser from './pages/FundraiserDetails'



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/fundraise" element={<Fundraise/>} />
        <Route exact path="/search" element={<Search/>} />
        <Route exact path="/admin" element={<Admin/>} />
        <Route exact path="/fundraiser/:id" element={<Fundraiser/>} />
      </Routes>
    </Router>
  );
}

export default App;
