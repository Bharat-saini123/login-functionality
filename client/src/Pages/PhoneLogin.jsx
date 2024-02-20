import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Container=styled.div`

display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
flex-direction: column;


div{
    .already-account{
            text-align: center;
            border: 1px solid red;
            font-size: 1.5rem;
            text-transform: capitalize;
            border: none;
            padding: 0.5rem;
            .navlink{
                display: inline-block;
                outline: none;
                text-decoration: none;
                margin-left: 1rem;
            }
        }
    .top-box-signup{
        padding: 5rem;
        border-radius: 5rem;
        background-color: #ededed;
        .forgotpassword{
         
            display: block;
            text-align: right;
            padding: 1rem;
            font-size: 1.5rem;
            color: #1717cedf;
            text-decoration: none;
            text-transform: capitalize;
        }
    
    .button{
        width: 100%;
       button{
        width: 100%;
        display: block;
        font-size: 2rem;
        margin-top: 3rem;
        text-transform: capitalize;
       }
    }
        
       
        .all-inputs{
            width: 40rem;
            height: 3rem;
            margin-top: 1rem;

            input{
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

const PhoneLogin = () => {
    const navigate=useNavigate();
    const [input, setInput] = useState({
      phone: "",
      password: "",
    });
  
    const handleInput = (e) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      setInput({ ...input, [name]: value });
    };
  
    const sendSigninData = async (e) => {
      e.preventDefault();
      const { phone, password } = input;
      try {
        const response = await fetch("http://localhost:5000/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
          }),
          credentials: "include",
        });
        const data = await response.json();
        if(response.status===400){
          toast.error("plz filled all the data",{
              autoClose:2000
          });
        }
        if(response.status===404){
          toast.error("Data invalid",{
              autoClose:2000
          });
        }
        if(response.status===412){
          toast.error("password invalid",{
              autoClose:2000
          });
        }
    
     
        if(response.status===200){
          toast.success("your successful login",{
              autoClose:2000
          });
          setInput({
              phone: "",
              password: "",
          })
          navigate("/after");
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (

    <Container>
    <div className='main-signup'>

<form className="top-box-signup" onSubmit={sendSigninData}>



<div className="username all-inputs"><input type="number" placeholder='Phone Number' name='phone'   value={input.phone} onChange={handleInput} /></div>

<div className="username all-inputs"><input type="password" placeholder='Password' name='password'   value={input.password} onChange={handleInput}/></div>

<NavLink className={"forgotpassword"} to="/forgotemail"> forgot password</NavLink>
<div className="button"><button className='btn btn-primary'>Sign in</button></div>



</form>
<div className="already-account">if you have not account register here <NavLink to="/signup" className={"navlink"}>Signup</NavLink></div>
<div className="already-account">login by <NavLink to="/signin" className={"navlink"}>email</NavLink></div>

    </div>
    </Container>
  )
}

export default PhoneLogin;