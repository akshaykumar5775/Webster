import React ,{ Fragment , useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';
import { connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getCompanyById } from '../../actions/userProfileAction';
 

const CompanyProfile = ({getCompanyById, profile: { companyProfile, loading} ,auth}) =>{

    const params = useParams();

    useEffect(()=> {
        getCompanyById(params.id);
    }, [getCompanyById, params.id]);

    return (
        <Fragment>
            {companyProfile===null || loading ? <Spinner /> : <Fragment>
             <Link to= '/companyProfiles' className='btn btn-light'>
                Back to company Profiles
             </Link>
             {/* {console.log(companyProfile)}
             {console.log(auth)} */}
             {auth.isAuthenticated && auth.loading===false && auth.user._id===companyProfile.company._id && (<Link to='edit-company-profile' className='btn btn-dark'>
                Edit Profile
             </Link>
             )}
            <div class="profile-grid my-1">
                <ProfileTop profile={companyProfile}/> 
                <ProfileAbout profile={companyProfile}/>
            </div>
          </Fragment>
          }
        </Fragment>
    );
};


CompanyProfile.propTypes={
   getCompanyById: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired
}

const mapStateToProps= state => ({
    profile:state.companyProfileReducer,
    auth:state.companyAuthReducer
})


export default  connect(mapStateToProps, {getCompanyById})(CompanyProfile)