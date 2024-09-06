import React , {Fragment , useEffect } from 'react';
import  PropTypes  from 'prop-types';
import {connect} from 'react-redux';
import Spinner from  '../layout/Spinner';
import UserProfileItem from './UserProfileItem';
import { getUserProfiles } from '../../actions/userProfileAction';


const UserProfiles = ({getUserProfiles, profile: {userProfiles, loading}}) => {
    
    useEffect(() => {
        getUserProfiles();
    },[getUserProfiles]);

    return <Fragment>
        { loading ? <Spinner /> : <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'></i> Browse and connect with Developers
            </p>
            <div className='profiles'>
                {userProfiles.length>0 ? (
                userProfiles.map(profile => (
                    <UserProfileItem key ={profile._id} profile={profile} />
                ))
                ) : <h4>No profile found...</h4>}
            </div>
            </Fragment>}
        
    </Fragment>;
    };

UserProfiles.propTypes ={
    getUserProfiles : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const  mapStateToProps = state =>({
    profile: state.userProfileReducer
})

export default connect (mapStateToProps, {getUserProfiles}) (UserProfiles);