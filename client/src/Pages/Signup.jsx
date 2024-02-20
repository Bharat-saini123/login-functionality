import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;

  div {
    .already-account {
      text-align: center;
      border: 1px solid red;
      font-size: 1.5rem;
      text-transform: capitalize;
      border: none;
      padding: 0.5rem;
      .navlink {
        display: inline-block;
        outline: none;
        text-decoration: none;
        margin-left: 1rem;
      }
    }
    .top-box-signup {
      padding: 5rem;
      border-radius: 5rem;
      background-color: #ededed;

      .button {
        width: 100%;
        button {
          width: 100%;
          display: block;
          font-size: 2rem;
          margin-top: 3rem;
          text-transform: capitalize;
        }
      }

      .all-inputs {
        width: 40rem;
        height: 3rem;
        margin-top: 1rem;

        input {
          width: 100%;
          height: 100%;
          cursor: pointer;
          outline: none;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.5rem;
          border-radius: 1rem;
        }
      }
    }
  }
`;

const Signup = () => {
    const navigate=useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });
  const sendSignupData = async (e) => {
    e.preventDefault();
    const { username, email, phone, password, confirmpassword } = input;
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
          confirmpassword,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if(response.status===404){
        toast.error("plz filled all the data",{
            autoClose:2000
        });
      }
      if(response.status===400){
        toast.error("your email already exist",{
            autoClose:2000
        });
      }
      if(response.status===408){
        toast.error("your number already exist plz try another number",{
            autoClose:2000
        });
      }
      if(response.status===412){
        toast.error("your email format not valid",{
            autoClose:2000
        });
      }
      if(response.status===416){
        toast.error("your Phone number is wrong ",{
            autoClose:2000
        });
      }
      if(response.status===420){
        toast.error("your password not match confirm password",{
            autoClose:2000
        });
      }
    
      if(response.status===200){
        toast.success("successful register",{
            autoClose:2000
        });
        setInput({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmpassword: "",
        })
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };
  return (
    <Container>
      <div className="main-signup">
        <form className="top-box-signup" onSubmit={sendSignupData}>
          <div className="username all-inputs">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleInput}
            />
          </div>
          <div className="username all-inputs">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleInput}
            />
          </div>
          <div className="username all-inputs">
            <input
              type="number"
              placeholder="Phone Number"
              name="phone"
              value={input.phone}
              onChange={handleInput}
            />
          </div>
          <div className="username all-inputs">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <div className="username all-inputs">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={input.confirmpassword}
              onChange={handleInput}
            />
          </div>
          <div className="button">
            <button className="btn btn-primary">Signup</button>
          </div>
        </form>
        <div className="already-account">
          if you have already account{" "}
          <NavLink to="/signin" className={"navlink"}>
            Login
          </NavLink>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
