import axios from "axios";
import { setAlert } from './alert';
import { USER_REGISTER_SUCCESS, 
          USER_REGISTER_FAIL, 
            USER_AUTH_ERROR, 
            USER_LOADED, 
            USER_LOGIN_FAIL, 
            USER_LOGIN_SUCCESS, 
            USER_LOGOUT, 
            CLEAR_USER_PROFILE } 
          from "./types";
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/userAuth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_AUTH_ERROR
    });
  }
}


// Register
export const registerUser =
  ({ name, email, password }) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ name, email, password });

      try {
        const res = await axios.post("/api/signUpUser", body, config);

        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: res.data,
        });

        dispatch(loadUser());

      } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
          type: USER_REGISTER_FAIL,
        });
      }
    };



// Log In User
export const loginUser =
  (email, password) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ email, password });

      try {
        const res = await axios.post("/api/userAuth", body, config);

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data,
        });

        dispatch(loadUser());

      } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
          type: USER_LOGIN_FAIL,
        });
      }
    };


// Logout / Clear profile
export const logoutUser = () => dispatch => {
  dispatch({ type: CLEAR_USER_PROFILE });
  dispatch({ type: USER_LOGOUT });
}




// import axios from "axios";
// import { setAlert } from './alert';
// import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USER_LOADED, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from "./types";
// import setAuthToken from '../utils/setAuthToken';

// // Load User
// export const loadUser = () => async dispatch => {

//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get('/api/auth');

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR
//     });
//   }
// }



// // Register
// export const register =
//   ({ name, email, password }) =>
//     async (dispatch) => {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const body = JSON.stringify({ name, email, password });

//       try {
//         const res = await axios.post("/api/users", body, config);

//         dispatch({
//           type: REGISTER_SUCCESS,
//           payload: res.data,
//         });

//         dispatch(loadUser());

//       } catch (err) {

//         const errors = err.response.data.errors;

//         if (errors) {
//           errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
//         }

//         dispatch({
//           type: REGISTER_FAIL,
//         });
//       }
//     };



// // Log In User
// export const login =
//   (email, password) =>
//     async (dispatch) => {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const body = JSON.stringify({ email, password });

//       try {
//         const res = await axios.post("/api/auth", body, config);

//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: res.data,
//         });

//         dispatch(loadUser());

//       } catch (err) {

//         const errors = err.response.data.errors;

//         if (errors) {
//           errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
//         }

//         dispatch({
//           type: LOGIN_FAIL,
//         });
//       }
//     };


// // Logout / Clear profile
// export const logout = () => dispatch => {
//   dispatch({ type: CLEAR_PROFILE });
//   dispatch({ type: LOGOUT });
// }









// // import axios from 'axios';
// // import setAuthToken from '../utils/setAuthToken';
// // import jwt_decode from 'jwt-decode';

// // import { GET_ERRORS, SET_CURRENT_USER } from './types';

// // // Register User
// // export const registerUser = (userData, history) => async dispatch => {

// //   const config = {
// //     headers: {
// //       'Content-Type': 'application/json'
// //     }
// //   }

// //   await axios.post('/api/signUpUser', userData, config)
// //     .then(res => history.push('/userAuth'))
// //     .catch(err =>
// //       dispatch({
// //         type: GET_ERRORS,
// //         payload: err.response.data
// //       })
// //     );
// // };

// // // Login - Get User Token
// // export const loginUser = userData => dispatch => {
// //   axios
// //     .post('/api/userAuth', userData)
// //     .then(res => {
// //       // Save to localStorage
// //       const { token } = res.data;
// //       // Set token to ls
// //       localStorage.setItem('jwtToken', token);
// //       // Set token to Auth header
// //       setAuthToken(token);
// //       // Decode token to get user data
// //       const decoded = jwt_decode(token);
// //       // Set current user
// //       dispatch(setCurrentUser(decoded));
// //     })
// //     .catch(err =>
// //       dispatch({
// //         type: GET_ERRORS,
// //         payload: err.response.data
// //       })
// //     );
// // };

// // // Set logged in user
// // export const setCurrentUser = decoded => {
// //   return {
// //     type: SET_CURRENT_USER,
// //     payload: decoded
// //   };
// // };

// // // Log user out
// // export const logoutUser = () => dispatch => {
// //   // Remove token from localStorage
// //   localStorage.removeItem('jwtToken');
// //   // Remove auth header for future requests
// //   setAuthToken(false);
// //   // Set current user to {} which will set isAuthenticated to false
// //   dispatch(setCurrentUser({}));
// // };
