import {
    GET_COMPANY_PROFILE,
    GET_COMPANY_PROFILES,
    COMPANY_PROFILE_ERROR,
    CLEAR_COMPANY_PROFILE,
    UPDATE_COMPANY_PROFILE
  } from '../actions/types';
  
  const initialState = {
    companyProfile: null,
    companyProfiles: [],
    loading: false,
    error: {}
  };
  
export default function companyProfileReducer(state = initialState, action) {

  const { type, payload } = action;

    switch (type) {
    
        case GET_COMPANY_PROFILES:
      return {
        ...state,
        companyProfiles: payload,
        loading: false
      }
      case UPDATE_COMPANY_PROFILE:
      case GET_COMPANY_PROFILE:
        return {
          ...state,
          companyProfile: payload,
          loading: false
        };

      
        case CLEAR_COMPANY_PROFILE:
          return {
            ...state,
            companyProfile: null,
            loading: false
          }      
    
        case COMPANY_PROFILE_ERROR:
          return {
            ...state,
            error: payload,
            loading: false
          }
    
      
      default:
        return state;
    }
  }
  