import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginCompany } from "../../actions/companyAuthActions";

const LogInCompany = ({ loginCompany, isAuthenticated }) => {
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

    loginCompany(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/companydashboard" />;
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
          value="Login Company"
        />
      </form>
      <p className="my-1">
        Don't have an company account?{" "}
        <Link to="/signUpCompany">Sign Up Company</Link>
      </p>
    </Fragment>
  );
};

LogInCompany.propTypes = {
  loginCompany: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.companyAuthReducer.isAuthenticated,
});

export default connect(mapStateToProps, { loginCompany })(LogInCompany);
