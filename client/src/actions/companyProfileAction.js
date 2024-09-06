import axios from 'axios';
import { setAlert } from "./alert";

import {
  GET_COMPANY_PROFILE,
  CLEAR_COMPANY_PROFILE,
  COMPANY_ACCOUNT_DELETED,
  UPDATE_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
  COMPANY_PROFILE_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILES,
  USER_PROFILE_ERROR
} from './types';

// Get current profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/company/me");

    dispatch({
      type: GET_COMPANY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all user profiles
export const getUserProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_COMPANY_PROFILE,
  });

  try {
    const res = await axios.get("/api/profile/user");

    dispatch({
      type: GET_USER_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all company profiles
export const getCompanyProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_COMPANY_PROFILE,
  });

  try {
    const res = await axios.get("/api/profile/company");

    dispatch({
      type: GET_COMPANY_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get user profile by id
export const getProfileById = (userId) => async (dispatch) => {

  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Get company profile by id
export const getCompanyById = (companyId) => async (dispatch) => {

  try {
    const res = await axios.get(`/api/profile/company/${companyId}`);

    dispatch({
      type: GET_COMPANY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// export const getCurrentProfile = () => dispatch => {
//   dispatch(setProfileLoading());
//   axios
//     .get('/api/routes/companyProfile')

//     .then(res =>
//       dispatch({
//         type: GET_COMPANY_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_COMPANY_PROFILE,
//         payload: {}
//       })
//     );
// };


// Create Profile

export const createProfile =
  (formData, history, edit = false) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post("/api/profile/company", formData, config);

        console.log(res.data);
        dispatch({
          type: GET_COMPANY_PROFILE,
          payload: res.data,
        });

        dispatch(
          setAlert(edit ? "Profile-Updated" : "Profile-Created", "success")
        );

        if (!edit) {
          history.push("/companydashboard");
        }
      } catch (err) {
        console.log(err.response);
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
          type: COMPANY_PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    };

// export const createProfile = (profileData, history) => dispatch => {
//   axios
//     .post('/api/routes/companyProfile', profileData)
//     .then(res => history.push('/dashboard'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };


// Delete account & profile

export const deleteCompanyAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone.")) {
    try {
      await axios.delete("/api/profile/company");

      dispatch({ type: CLEAR_COMPANY_PROFILE });
      dispatch({ type: COMPANY_ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanantly deleted."));
    } catch (err) {
      dispatch({
        type: COMPANY_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// export const deleteAccount = () => dispatch => {
//   if (window.confirm('Are you sure? This can NOT be undone!')) {
//     axios
//       .delete('/api/routes/companyProfile')
//       .then(res =>
//         dispatch({
//           type: SET_CURRENT_COMPANY,
//           payload: {}
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   }
// };

// // Profile loading
// export const setProfileLoading = () => {
//   return {
//     type: COMPANY_PROFILE_LOADING
//   };
// };

// // Clear profile
// export const clearCurrentProfile = () => {
//   return {
//     type: CLEAR_CURRENT_COMPANY_PROFILE
//   };
// };
