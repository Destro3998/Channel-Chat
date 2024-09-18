import "./Navbar.scss";
import axios from "axios";
import { BsMoon } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  async function handlelogout() {
    localStorage.clear();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/logout");
      if (res.status === 200) return res.data && navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Channel-Based Chat</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/newsfeed" style={{ textDecoration: "none" }}>
          Explore
        </Link>
      </div>
      <div className="right">
        <div className="user">
          {darkMode ? <BiSun onClick={toggle} /> : <BsMoon onClick={toggle} />}
          <span className="logout-button" onClick={handlelogout}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
