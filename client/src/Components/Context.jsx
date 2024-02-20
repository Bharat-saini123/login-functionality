import { createContext, useReducer } from "react";
import CountReducer from "../Reducers/CountReducer";
const AppContext=createContext();

const initialCountValue={
    count:true,
}
const AppProvider=({children})=>{

    const [countState,countDispatch]=useReducer(CountReducer,initialCountValue);
    return <AppContext.Provider value={{countDispatch,...countState}}>

{children}

    </AppContext.Provider>
}
export {AppContext,AppProvider};