import React, { Fragment } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../../actions/userAuthActions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from "../../actions/alert";

import "./style.css";

const SignUpUser = ({ setAlert,registerUser, isAuthenticated }) => {

  const [userData, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { name, email, password, cpassword } = userData;

  const handleInputs = (event) => {

    setUser({ ...userData, [event.target.name]: event.target.value });
  };

  const onSubmit = async event => {
    event.preventDefault();

    if(password !== cpassword) {
       await setAlert("Passwords don't match.", 'danger');
    } else {
      registerUser({name, email, password});
    }
  }

  if(isAuthenticated) {
    return <Navigate to='/userdashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => handleInputs(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleInputs(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => handleInputs(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            minLength="6"
            value={cpassword}
            onChange={(e) => handleInputs(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/logInUser">Sign In</Link>
      </p>
    </Fragment>
  );
}

SignUpUser.propTypes = {
  setAlert : PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.userAuthReducer.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, registerUser})(SignUpUser);
