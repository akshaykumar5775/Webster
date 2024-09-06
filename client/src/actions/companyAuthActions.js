import axios from "axios";
import { setAlert } from './alert';
import { COMPANY_REGISTER_SUCCESS, 
  COMPANY_REGISTER_FAIL, 
  COMPANY_AUTH_ERROR, 
  COMPANY_LOADED, 
  COMPANY_LOGIN_FAIL, 
  COMPANY_LOGIN_SUCCESS, 
  COMPANY_LOGOUT, 
  CLEAR_COMPANY_PROFILE } 
  from "./types";
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadCompany = () => async dispatch => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/companyAuth');

    dispatch({
      type: COMPANY_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPANY_AUTH_ERROR
    });
  }
}


// Register
export const registerCompany =
  ({ companyname, email, password }) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ companyname, email, password });

      try {
        const res = await axios.post("/api/signUpCompany", body, config);

        dispatch({
          type: COMPANY_REGISTER_SUCCESS,
          payload: res.data,
        });

        dispatch(loadCompany());

      } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
          type: COMPANY_REGISTER_FAIL,
        });
      }
    };



// Log In Company
export const loginCompany =
  (email, password) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ email, password });

      try {
        const res = await axios.post("/api/companyAuth", body, config);

        dispatch({
          type: COMPANY_LOGIN_SUCCESS,
          payload: res.data,
        });

        dispatch(loadCompany());

      } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
          type: COMPANY_LOGIN_FAIL,
        });
      }
    };


// Logout / Clear profile
export const logoutCompany = () => dispatch => {
  dispatch({ type: CLEAR_COMPANY_PROFILE });
  dispatch({ type: COMPANY_LOGOUT });
}






// import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

// import { GET_ERRORS, SET_CURRENT_COMPANY } from './types';

// // Register User
// export const registerUser = (userData, history) => dispatch => {
//   axios
//     .post('/api/signUpCompany', userData)
//     .then(res => history.push('/companyAuth'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Login - Get User Token
// export const loginUser = userData => dispatch => {
//   axios
//     .post('/api/companyAuth', userData)
//     .then(res => {
//       // Save to localStorage
//       const { token } = res.data;
//       // Set token to ls
//       localStorage.setItem('jwtToken', token);
//       // Set token to Auth header
//       setAuthToken(token);
//       // Decode token to get user data
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Set logged in user
// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_COMPANY,
//     payload: decoded
//   };
// };

// // Log user out
// export const logoutUser = () => dispatch => {
//   // Remove token from localStorage
//   localStorage.removeItem('jwtToken');
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
// };
