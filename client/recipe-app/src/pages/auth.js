import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import '../tailwind.css'; // Import Tailwind CSS
import '../App.css';

export const Auth = () => {
  return (<div className="auth">
    <Login />
    <Register />
  </div>
  );
};

const Login = () => {
  // only need access to cookie (setCookie)   access_token = name of cookie
  const [_, setCookies] = useCookies(["access_token"])
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

      //response json being sent from route is (users.js) token, userId
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);

      //when logged in redirect to home page
      navigate("/");
    } catch (err) {
      console.error(err);
    }

  }
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

  const onSubmit = async (event) => {
    event.preventDefault(); //wont refresh page when sent

    //use axios to send post request to api
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed: Now login");

    } catch (err) {
      console.error(err);
    };

  }
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );

};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    < div className="flex flex-col justify-center items-center p-5 bg-white rounded shadow-md m-5 w-[400px]" >
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            className="border-2 border-black"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Pasword: </label>
          <input
            type="password"
            id="password"
            className="border-2 border-black"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
        </div>

        <button className="bg-grey border-2 border-black rounded-md px-1" type="submit">{label}</button>
      </form>
    </div >
  );

}