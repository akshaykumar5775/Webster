import {
  GET_USER_PROFILE,
  USER_PROFILE_ERROR,
  UPDATE_USER_PROFILE,
  CLEAR_USER_PROFILE,
  GET_USER_PROFILES
} from "../actions/types";

const initialState = {
  userProfile: null,
  userProfiles: [],
  loading: true,
  error: {}
}

export default function userProfileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case GET_USER_PROFILE:
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
        loading: false
      }

    case GET_USER_PROFILES:
      return {
        ...state,
        userProfiles: payload,
        loading: false
      }

    case USER_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }

    case CLEAR_USER_PROFILE:
      return {
        ...state,
        userProfile: null,
        loading: false
      }      

    default:
      return state
  }
}





// import {
//   GET_USER_PROFILE,
//   USER_PROFILE_LOADING,
//   CLEAR_CURRENT_USER_PROFILE
// } from '../actions/types';

// const initialState = {
//   profile: null,
//   profiles: null,
//   loading: false
// };

// export default function userProfileReducer(state = initialState, action) {
//   switch (action.type) {
//     case USER_PROFILE_LOADING:
//       return {
//         ...state,
//         loading: true
//       };
//     case GET_USER_PROFILE:
//       return {
//         ...state,
//         profile: action.payload,
//         loading: false
//       };
//     case CLEAR_CURRENT_USER_PROFILE:
//       return {
//         ...state,
//         profile: null
//       };
//     default:
//       return state;
//   }
// }
