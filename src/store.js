import { createStore } from 'redux';
let reducer = (state, action) => {
  if (action.type === 'login-sucess') {
    console.log('login content', action.content);
    return { ...state, username: action.content };
  }
  if (action.type === 'logout') {
    console.log('login content', action.content);
    return { ...state, username: undefined };
  }
  if (action.type === 'set-items') {
    console.log('set items content', action.content);
    return { ...state, items: action.content };
  }
  if (action.type === 'filter') {
    console.log('filter content', action.content);
    return { ...state, searchTag: action.content };
  }
  if (action.type === 'add-to-cart') {
    console.log('add to cart', action.content);
    return { ...state, cart: action.content };
  }
  return state;
};
const store = createStore(
  reducer,
  { username: undefined, items: [], searchTag: '', cart: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
