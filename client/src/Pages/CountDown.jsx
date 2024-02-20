import React, { useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styled from 'styled-components';
import { AppContext } from '../Components/Context';
const Container=styled.div`
div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div{
        font-size: 3rem;
    }
}
`;

const CountDown = () => {
    const {count}=useContext(AppContext);
const MainContainer=()=>{
  if(!count){
    return  (
    <div>
    <div style={{textAlign:"center",textTransform:"capitalize"}}>the otp valid only</div>
    <CountdownCircleTimer
    isPlaying
    duration={30}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
    
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
  </div>)
  }else{
    return <div></div>
  }
}
 
  return (
    <Container id='count-main-id'> 
    <MainContainer/>
    </Container>
  )
}

export default CountDown