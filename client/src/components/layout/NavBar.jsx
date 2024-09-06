import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/userAuthActions";
import { logoutCompany } from "../../actions/companyAuthActions";

const Navbar = ({
  userAuth: { isAuthenticated: userAuthenticated, loading: userLoading },
  logoutUser,
  companyAuth: {
    isAuthenticated: companyAuthenticated,
    loading: companyLoading,
  },
  logoutCompany,
}) => {
  const userLinks = (
    <ul>
      <li>
        <Link to="/companyProfiles">Companies</Link>
      </li>
      <li>
        <Link to="/userProfiles">Users</Link>
      </li>
      <li>

        <Link to="/userdashboard">
          {/* <i className="fas fa-user" /> */}
          <span className="hide-sm">User Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logoutUser} href="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const companyLinks = (
    <ul>
      <li>
        <Link to="/companyProfiles">Companies</Link>
      </li>
      <li>
        <Link to="/userProfiles">Users</Link>
      </li>
      <li>
        <Link to="/companydashboard">
          {/* <i className="fas fa-user" /> */}
          <span className="hide-sm">Company Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logoutCompany} href="/">
          {/* <i className="fas fa-sign-out-alt" />{" "} */}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/companyProfiles">Companies</Link>
      </li>
      <li>
        <Link to="/userProfiles">Users</Link>
      </li>
      <li>
        <Link to="/signUpCompany">Register Company</Link>
      </li>
      <li>
        <Link to="/logInCompany">Login Company</Link>
      </li>
      <li>
        <Link to="/signUpUser">Register User</Link>
      </li>
      <li>
        <Link to="/logInUser">Login User</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" />
          Seeking Jobs
        </Link>
      </h1>

      <Fragment>
        {!userLoading && userAuthenticated
          ? userLinks
          : !companyLoading && companyAuthenticated
          ? companyLinks
          : guestLinks}
      </Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  userAuth: PropTypes.object.isRequired,
  companyAuth: PropTypes.object.isRequired,
  logoutCompany: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuthReducer,
  companyAuth: state.companyAuthReducer,
});

export default connect(mapStateToProps, { logoutUser, logoutCompany })(Navbar);
