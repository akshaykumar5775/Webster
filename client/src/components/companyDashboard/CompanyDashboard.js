import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileActions from "./ProfileActions";
import { getCurrentProfile } from "../../actions/companyProfileAction";
import Spinner from "../layout/Spinner";

import { deleteCompanyAccount } from "../../actions/companyProfileAction";

const CompanyDashboard = ({
  getCurrentProfile,
  companyAuth: { company },
  companyProfile: { companyProfile, loading },
  deleteCompanyAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && companyProfile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user">Welcome {company && company.companyname}</i>
      </p>

      {companyProfile !== null ? (
        <Fragment>
          <ProfileActions />

          <div className="my-2">
            <button className="btn btn-danger" onClick={deleteCompanyAccount}>
              <i className="fas fa-user-minus" />
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info.</p>
          <Link to="/create-company-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

CompanyDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  companyAuth: PropTypes.object.isRequired,
  companyProfile: PropTypes.object.isRequired,
  deleteCompanyAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  companyAuth: state.companyAuthReducer,
  companyProfile: state.companyProfileReducer,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteCompanyAccount })(CompanyDashboard);


