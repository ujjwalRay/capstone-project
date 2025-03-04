import React, { useState } from "react";
import { useEffect } from "react";
import {LOGIN_URL, getJSONRequestData} from "../../Services/ApiService";
import { isValidPasswordLength } from "../../Services/FormValidation";



export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLoginHandler = (event) => {
    event.preventDefault();

    // validation of form input
    if (isValidPasswordLength(password)) {
      let employeeLoginData = {
        employeeId: username,
        password: password,
      };
      
      //connecting with backend
      fetch(LOGIN_URL, getJSONRequestData(employeeLoginData))
        .then(async (resp) => {
          const data = await resp.json();
          if (resp.status === 200) {
            props.setAuthorizedLogin(username);
            props.navigate("/dashboard");
          } else {
            props.navigate("/invalidCredentials");
          }
        })
        .catch((err) => {
          window.alert("Something went wrong.... Please try again after some time");
        });
    } else {
      setPassword("");
    }
  };

  return (
    <div className="outer">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Login</h3>
          <form onSubmit={onSubmitLoginHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Employee Id
              </label>
              <input
                type="text"
                className="form-control"
                id="text"
                name="employeeId"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={(e) => setUsername(e.target.value.trim())}
                placeholder="Enter your Employee Id"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
              />
              <div id="passwordHelpBlock" className="form-text">
                Your password must be atleast 8 characters long.
              </div>
            </div>

            <button type="submit" className="btn btn-primary mx-auto">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
