import React, { useState } from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
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
      .forgotpassword {
        display: block;
        text-align: right;
        padding: 1rem;
        font-size: 1.5rem;
        color: #1717cedf;
        text-decoration: none;
        text-transform: capitalize;
      }

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

const Newpassword = () => {
  const navigate=useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const handleInput = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const changePassword = async (e) => {
    e.preventDefault();
    const { email, password, repassword } = input;
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/newpassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            repassword,
            email,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(response.status);
      if(response.status===400){
        toast.error("your email is incorrect ",{
          autoClose:2000,
        })
      }if(response.status===404){
        toast.warn("your password not match confirm password",{
          autoClose:2000
        })
      
      }
      if(response.status===200){
        toast.success("you successfully updated password",{
          autoClose:2000,
        });
        navigate("/signin");
        setInput({
          email: "",
          password: "",
          repassword: "",
        })
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <div className="main-signup">
        <form className="top-box-signup" onSubmit={changePassword}>
          <div className="username all-inputs">
            <input
              type="text"
              placeholder="Email/Phone"
              name="email"
              value={input.email}
              onChange={handleInput}
            />
          </div>
          <div className="username all-inputs">
            <input
              type="text"
              placeholder="New Password"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
          </div>

          <div className="username all-inputs">
            <input
              type="text"
              placeholder="Retype Password "
              name="repassword"
              value={input.repassword}
              onChange={handleInput}
            />
          </div>

          <div className="button">
            <button className="btn btn-primary">Password Change</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Newpassword;
