import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import '../tailwind.css'; // Import Tailwind CSS
import '../App.css';

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed: Now login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      password2={password2}
      setPassword2={setPassword2}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword, password2, setPassword2, label, onSubmit, }) => {
  return (
    <div className="flex flex-col justify-center items-center p-5 bg-[#D2B48C] rounded-xl shadow-md m-5 w-[400px] ">
      <form onSubmit={onSubmit}>
        <h2 className="font-bold text-xl">{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            className="border-2 border-black px-1"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            className="border-2 border-black px-1"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {label === "Register" && (
          <div className="form-group">
            <label htmlFor="password2">Confirm Password: </label>
            <input
              type="password"
              id="password2"
              className="border-2 border-black px-1"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            />
          </div>
        )}

        <div>
          <button
            className="bg-grey border-2 border-black rounded-md px-1 hover:bg-green-600"
            type="submit"
          >
            {label}
          </button>
          {label === "Login" && (

            <button className="pl-2 text-[#047a9e] font-semibold underline">Sign up</button>

          )}
        </div>

      </form>
    </div>
  );
};
