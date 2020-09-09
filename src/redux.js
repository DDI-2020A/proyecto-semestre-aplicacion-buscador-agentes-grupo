import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  loading: true,
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        loading: false,
        currentUser: action.payload
      }
    case 'SET_USER_DATA':
      return {
        ...state,
        loading: false,
        userData: action.payload
      }
    default:
      return state;
  }
}
//current user data
export const fetchUserDataThunk = (uid) => {

  return async (dispatch) => {
    const {db} = await import('./utils/firebase_sdk');
    
    const userDoc = await db.collection('users').doc(uid).get();
    dispatch(setUserData(userDoc.data()));
      
  }
}
export const setUserAction = (currentUser) => { return { type: 'SET_USER', payload: currentUser } }
export const setUserData = (userData) => { return { type: 'SET_USER_DATA', payload: userData } }

const middleware = composeWithDevTools(applyMiddleware(reduxThunk));

export const store = createStore(reducer, middleware);
