import { COMPANY_REGISTER_SUCCESS, 
  COMPANY_REGISTER_FAIL, 
  COMPANY_AUTH_ERROR, 
  COMPANY_LOADED, 
  COMPANY_LOGIN_FAIL, 
  COMPANY_LOGIN_SUCCESS, 
  COMPANY_LOGOUT, 
  COMPANY_ACCOUNT_DELETED 
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

    case COMPANY_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }

    case COMPANY_REGISTER_SUCCESS:
    case COMPANY_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }

    case COMPANY_REGISTER_FAIL:
    case COMPANY_AUTH_ERROR:
    case COMPANY_LOGIN_FAIL:
    case COMPANY_LOGOUT:
    case COMPANY_ACCOUNT_DELETED:
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




// import isEmpty from '../validation/is-empty';

// import { SET_CURRENT_COMPANY } from '../actions/types';

// const initialState = {
//   isAuthenticated: false,
//   user: {}
// };

// export default function companyAuthReducer (state = initialState, action) {
//   switch (action.type) {
//     case SET_CURRENT_COMPANY:
//       return {
//         ...state,
//         isAuthenticated: !isEmpty(action.payload),
//         user: action.payload
//       };
//     default:
//       return state;
//   }
// }
