import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { loginUser } from "../../actions/userAuthActions";

const LogInUser = ({loginUser, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    loginUser(email, password);
  };

  // Navigate to dashboard if user is logged in
  if(isAuthenticated) {
    return <Navigate to='/userdashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <input 
        type="submit" 
        className="btn btn-primary" 
        value="LoginUser" 
        />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/signUpUser">Sign Up</Link>
      </p>
    </Fragment>
  );
};

LogInUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.userAuthReducer.isAuthenticated
})

export default connect(mapStateToProps, {loginUser})(LogInUser);
