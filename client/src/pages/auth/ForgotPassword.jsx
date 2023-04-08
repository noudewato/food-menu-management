import React from "react";
import { useState } from "react";
import { sendPassword, validateEmail } from '../../features/auth/authService'
import {toast} from 'react-toastify'
import "./auth.css";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async(e) => {
    e.preventDefault();

     if (!email) {
       return toast.error("Please enter an email");
     }

     if (!validateEmail(email)) {
       return toast.error("Please enter a valid email");
     }

     const userData = {
       email,
    };
    
    await sendPassword(userData);

    toast.success('Email Sent')

  };
  return (
    <div className="forgotPassword">
      <div className="container">
        <div className="top">
          <h2>Send Email</h2>
        </div>

        <div className="center">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                id="email"
                onChange={onChange}
                placeholder="Enter your email"
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

export default ForgotPassword;
