import React , {Fragment , useEffect } from 'react';
import  PropTypes  from 'prop-types';
import {connect} from 'react-redux';
import Spinner from  '../layout/Spinner';
import CompanyProfileItem from './CompanyProfileItem';
import { getCompanyProfiles } from '../../actions/userProfileAction';


const CompanyProfiles = ({getCompanyProfiles, profile: {companyProfiles, loading}}) => {
    
    useEffect(() => {
        getCompanyProfiles();
    },[getCompanyProfiles]);

    return <Fragment>
        { loading ? <Spinner /> : <Fragment>
            <h1 className='large text-primary'>Companies</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'></i> Browse and connect with companies
            </p>
            <div className='profiles'>
                {companyProfiles.length >0 ? (
                companyProfiles.map(profile => (
                    <CompanyProfileItem key ={profile._id} profile={profile} />
                ))
                ) : <h4>No profile found...</h4>}
            </div>
            </Fragment>}
        
    </Fragment>;
    };

CompanyProfiles.propTypes ={
    getCompanyProfiles : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const  mapStateToProps = state =>({
    profile: state.companyProfileReducer
})

export default connect (mapStateToProps, {getCompanyProfiles}) (CompanyProfiles);