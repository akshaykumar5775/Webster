import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUserProfile } from '../../actions/userProfileAction';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}


const CreateUserProfile = ({ createUserProfile, history }) => {

  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    name: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    resumelink: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  });


  const {
    displaySocialInputs,
    location,
    status,
    skills,
    bio,
    resumelink,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    errors
  } = formData

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();

    createUserProfile(formData, history);
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>

          <div className="form-group">
            <select name="status" value={status} onChange={(e) => onChange(e)}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>

          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="form-group">
            <textarea
              placeholder="Resume Link"
              name="resumelink"
              value={resumelink}
              onChange={(e) => onChange(e)}></textarea>
            <small className="form-text">Enter your resume link. Make it public before giving link.</small>
          </div>

          <div className="my-2">
            <button
              onClick={(event) => setFormData({ ...formData, displaySocialInputs: !displaySocialInputs })}
              type="button"
              className="btn btn-light">
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          <Link to='/userdashboard' className="btn btn-light my-1">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
}

CreateUserProfile.propTypes = {
  createUserProfile: PropTypes.func.isRequired
};

export default connect(null, { createUserProfile })(
  withRouter(CreateUserProfile)
);

