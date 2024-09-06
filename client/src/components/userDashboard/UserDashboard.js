import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileActions from "./ProfileActions";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";
import Education from "./Education";

import { getCurrentProfile, deleteUserAccount } from "../../actions/userProfileAction";

const UserDashboard = ({
  getCurrentProfile,
  userAuth: { user },
  userProfile: { userProfile, loading },
  deleteUserAccount
}) => {
  
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && userProfile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user">Welcome {user && user.name}</i>
      </p>

      {userProfile !== null ? (
        <Fragment>
          <ProfileActions />
          <Experience experience={userProfile.experience} />
          <Education education={userProfile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={deleteUserAccount}>
              <i className="fas fa-user-minus" />
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info.</p>
          <Link to="/create-user-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

UserDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  userAuth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  deleteUserAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuthReducer,
  userProfile: state.userProfileReducer,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteUserAccount })(UserDashboard);
