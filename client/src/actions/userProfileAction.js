import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_USER_PROFILE,
  USER_PROFILE_ERROR,
  UPDATE_USER_PROFILE,
  CLEAR_USER_PROFILE,
  USER_ACCOUNT_DELETED,
  GET_USER_PROFILES,
  GET_COMPANY_PROFILES,
  GET_COMPANY_PROFILE,
  COMPANY_PROFILE_ERROR,
  CLEAR_COMPANY_PROFILE
} from "./types";

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/user/me");

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

// Get all user profiles
export const getUserProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_USER_PROFILE,
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


// Create or update a user Profile
export const createUserProfile =
  (formData, history, edit = false) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post("/api/profile/user", formData, config);

        console.log(res.data);
        dispatch({
          type: GET_USER_PROFILE,
          payload: res.data,
        });

        dispatch(
          setAlert(edit ? "Profile-Updated" : "Profile-Created", "success")
        );

        if (!edit) {
          history.push("/userdashboard");
        }
      } catch (err) {
        console.log(err.response);
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
          type: USER_PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    };

// Add experience
export const addUserExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/user/experience", formData, config);

    console.log(res.data);
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/userdashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add education
export const addUserEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/user/education", formData, config);

    console.log(res.data);
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/userdashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience
export const deleteUserExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/user/experience/${id}`);

    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience deleted", "success"));
  } catch (err) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const deleteUserEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/user/education/${id}`);

    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education deleted", "success"));
  } catch (err) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account and profile
export const deleteUserAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone.")) {
    try {
      await axios.delete("/api/profile/user");

      dispatch({ type: CLEAR_USER_PROFILE });
      dispatch({ type: USER_ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanantly deleted."));
    } catch (err) {
      dispatch({
        type: USER_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};




// import axios from 'axios';

// import {
//   GET_USER_PROFILE,
//   USER_PROFILE_LOADING,
//   CLEAR_CURRENT_USER_PROFILE,
//   GET_ERRORS,
//   SET_CURRENT_USER
// } from './types';

// // Get current profile
// export const getCurrentProfile = () => dispatch => {
//   dispatch(setProfileLoading());
//   axios
//     .get('/api/profile/user/me')
//     .then(res =>
//       dispatch({
//         type: GET_USER_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_USER_PROFILE,
//         payload: {}
//       })
//     );
// };

// // Create Profile
// export const createProfile = (profileData, history) => dispatch => {
//   axios
//     .post('/api/profile/user', profileData)
//     .then(res => history.push('/userDashboard'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Add experience
// export const addExperience = (expData, history) => dispatch => {
//   axios
//     .post('/api/profile/user/experience', expData)
//     .then(res => history.push('/userDashboard'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Add education
// export const addEducation = (eduData, history) => dispatch => {
//   axios
//     .post('/api/profile/user/education', eduData)
//     .then(res => history.push('/userDashboard'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Delete Experience
// export const deleteExperience = id => dispatch => {
//   axios
//     .delete(`/api/profile/user/experience/${id}`)
//     .then(res =>
//       dispatch({
//         type: GET_USER_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Delete Education
// export const deleteEducation = id => dispatch => {
//   axios
//     .delete(`/api/profile/user/education/${id}`)
//     .then(res =>
//       dispatch({
//         type: GET_USER_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Delete account & profile
// export const deleteAccount = () => dispatch => {
//   if (window.confirm('Are you sure? This can NOT be undone!')) {
//     axios
//       .delete('/api/profile/user')
//       .then(res =>
//         dispatch({
//           type: SET_CURRENT_USER,
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
//     type: USER_PROFILE_LOADING
//   };
// };

// // Clear profile
// export const clearCurrentProfile = () => {
//   return {
//     type: CLEAR_CURRENT_USER_PROFILE
//   };
// };
