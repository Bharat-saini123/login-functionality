const CountReducer=(state,action)=>{

    switch(action.type){
case "CHANGE_COUNT":{
   return{
    ...state,
    count:action.payload,
   }

}
    }
    return state;

}
export default CountReducer;