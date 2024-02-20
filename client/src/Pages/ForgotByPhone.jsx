import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountDown from './CountDown';
import { AppContext } from "../Components/Context";
import { useContext,useEffect } from 'react';

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
        .box-flex{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .sent-otp-button{
                button{
                    font-size: 1.5rem;
                    font-weight: 500;
                    text-transform: capitalize;

                }
            }
        }
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
            #otp{
                display: none;
            }
        }
    }
}

`;

const ForgotByPhone = () => {
    const {count,countDispatch} =useContext(AppContext);
    const navigate=useNavigate();
    const [input,setInput]=useState({
        phone:"",
        otp:"",
    })
    const handleInput=(e)=>{
        e.preventDefault();
        const name=e.target.name;
        const value=e.target.value;
        setInput({...input,[name]:value});

    }
    const sentOtpFunction=async(e)=>{
const {phone}=input;
try{
    const response=await fetch("http://localhost:5000/api/auth/forgotphone",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            phone
        }),
        credentials:"include"
    })

    const data=await response.json();
   if(response.status===404){
    toast.error("you number is incorrect",{
        autoClose:2000,
    })
   }
   if(response.status===200){
    toast.success("otp sent succesfully",{
        autoClose:2000
    });
    const id=document.getElementById("otp");
    id.style.display="block";
    if(id.style.display="block"){
        countDispatch({type:"CHANGE_COUNT",payload:false});
        setTimeout(()=>{
          countDispatch({type:"CHANGE_COUNT",payload:true});
        },30000)

      }else{
   
        countDispatch({type:"CHANGE_COUNT",payload:true});
      }
   }

}catch(error){
    console.log(error);
}
    }

    const sentPhoneVerification=async(e)=>{
e.preventDefault();
const {phone,otp}=input
try{
    const response=await fetch("http://localhost:5000/api/auth/forgotDataPhone",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            phone,otp
        }),
        credentials:"include",
    })
const data=await response.json();
if(response.status===400){
    toast.error("your number is incorrect",{
        autoClose:2000,
    })

}
if(response.status===408){
    toast.error("your otp is incorrect",{
        autoClose:2000,
    })
}
if(response.status===200){
    toast.success("your otp is correct",{
        autoClose:2000
    });
    navigate("/newpassword");
}


}catch(error){
    console.log(error)
}
    }
    useEffect(()=>{
        countDispatch({type:"CHANGE_COUNT",payload:true});
      },[])
  return (

    <Container>
         <CountDown className="countdown"/>
    <div className='main-signup'>

<div className="top-box-signup">



<div className="username all-inputs"><input type="number" placeholder='Phone Number' name='phone' value={input.phone} onChange={handleInput}/></div>

<div className="username all-inputs"><input type="number" placeholder='OTP' name='otp' id='otp' value={input.otp}   onChange={handleInput}/></div>
<div className="box-flex">
<div className="sent-otp-button"><button className='btn btn-danger' onClick={sentOtpFunction}>Sent otp</button></div>
<NavLink className={"forgotpassword"} to="/forgotemail"> forgot password by Email</NavLink>
</div>

<div className="button"><button className='btn btn-primary' onClick={sentPhoneVerification}>submitted</button></div>



</div>

<div className="already-account">if you have already account <NavLink to="/signin" className={"navlink"}>Login</NavLink></div>

    </div>
    </Container>
  )
}

export default ForgotByPhone