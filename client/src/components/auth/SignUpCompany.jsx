import React, { Fragment } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from "../../actions/alert";
import { registerCompany } from "../../actions/companyAuthActions";
import "./style.css";

const SignUpCompany = ({setAlert, registerCompany, isAuthenticated }) => {

  const [companyData, setCompany] = useState({
    companyname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { companyname, email, password, cpassword } = companyData;

  const handleInputs = (event) => {
    setCompany({ ...companyData, [event.target.name]: event.target.value });
  };

  const sendData = async (event) => {
    event.preventDefault();

    if(password !== cpassword) {
      await setAlert("Passwords don't match.", 'danger')
    } else {
      registerCompany({ companyname, email, password });
    }
  };

  if(isAuthenticated) {
    return <Navigate to='/companydashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <form className="form" onSubmit={(e) => sendData(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company Name"
            name="companyname"
            value={companyname}
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
        Already have an company account? <Link to="/logInCompany">Sign In</Link>
      </p>
    </Fragment>
  );
}

SignUpCompany.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerCompany: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.companyAuthReducer.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, registerCompany})(SignUpCompany);
