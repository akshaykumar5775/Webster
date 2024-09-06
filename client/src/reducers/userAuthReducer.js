import { USER_REGISTER_SUCCESS, 
  USER_REGISTER_FAIL, 
  USER_AUTH_ERROR, 
  USER_LOADED, 
  USER_LOGIN_FAIL, 
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT, 
  USER_ACCOUNT_DELETED 
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
}

export default function userAuthReducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }

    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }

    case USER_REGISTER_FAIL:
    case USER_AUTH_ERROR:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT:
    case USER_ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }

    default:
      return state;
  }
}




// import isEmpty from '../validation/is-empty';

// import { SET_CURRENT_USER } from '../actions/types';

// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: false,
//   loading: true,
//   user: null
// };

// export default function userAuthReducer(state = initialState, action) {

//   const { type, payload } = action;
  
//   switch (type) {
//     case SET_CURRENT_USER:
//       return {
//         ...state,
//         isAuthenticated: !isEmpty(payload),
//         user: action.payload,
//         loading: false
//       };
//     default:
//       return state;
//   }
// }
