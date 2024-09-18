import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import axios from "axios";

const CreateChannel = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/auth/register", inputs);
      navigate(`/login`);
    } catch (err) {
      console.log(err.response.data);
      setErr(err.response.data);
    }
  };

  console.log(err);
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Create Channel</h1>
          <h3>Channel-Based Chat Tool</h3>
          <span>Do you have an Channel</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Create New Channel</h1>
          <form>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Channel Name"
            />
            <input
              type="text"
              placeholder="Channel Username"
              name="username"
              onChange={handleChange}
            />{" "}
            <input
              type="email"
              placeholder="Channel Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Channel Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
