import React from "react";
import './auth.css'
import { useState } from "react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="ResetPassword">
      <div className="container">
        <div className="top">
          <h2>Reset Password</h2>
        </div>

        <div className="center">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                id="password"
                onChange={onChange}
                placeholder="Enter New password"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password2"
                value={password2}
                id="password"
                onChange={onChange}
                placeholder="Confirm password"
              />
            </div>

            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
