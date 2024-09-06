import React ,{ Fragment , useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';
import { connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { getProfileById } from '../../actions/userProfileAction';
 

const UserProfile = ({getProfileById, profile: { userProfile, loading} ,auth}) =>{

    const params = useParams();

    useEffect(()=> {
        getProfileById(params.id);
    }, [getProfileById, params.id]);

    return (
        <Fragment>
            {userProfile===null || loading ? <Spinner /> : <Fragment>
             <Link to= '/userProfiles' className='btn btn-light'>
                Back to user Profiles
             </Link>
             {auth.isAuthenticated && auth.loading===false && auth.user._id===userProfile.user._id && (<Link to='/edit-user-profile' className='btn btn-dark'>
                Edit Profile
             </Link>
             )}
            <div className="profile-grid my-1">
                <ProfileTop profile={userProfile}/> 
                <ProfileAbout profile={userProfile}/>
                <div className='profile-exp bg-white p-2'>
                    <h2 className='text-primary'>Experience</h2>
                    {userProfile.experience.length >0 ? (<Fragment>
                        {userProfile.experience.map(experience =>(
                            <ProfileExperience key={experience._id} experience={experience} />
                            ))}
                    </Fragment>): (<h4>No experience credentials</h4>)}
                </div>

                <div className='profile-edu bg-white p-2'>
                    <h2 className='text-primary'>Education</h2>
                    {userProfile.education.length >0 ? (<Fragment>
                        {userProfile.education.map(education =>(
                            <ProfileEducation key={education._id} education={education} />
                            ))}
                    </Fragment>): (<h4>No education credentials</h4>)}
                </div>
            </div>
          </Fragment>
          }
        </Fragment>
    );
};


UserProfile.propTypes={
   getProfileById: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired
}

const mapStateToProps= state => ({
    profile:state.userProfileReducer,
    auth:state.userAuthReducer
})


export default  connect(mapStateToProps, {getProfileById})(UserProfile)