import { createStore } from "redux" 
let reducer = (state, action) => { 
    if (action.type === "login-sucess") { 
        console.log("action.content",action.content)
        return { ...state, username: action.content } 
    } 
    return state  
} 
const store = createStore( 
    reducer, 
    { username: undefined }, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
) 
export default store 