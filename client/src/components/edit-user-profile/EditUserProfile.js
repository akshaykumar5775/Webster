import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  createUserProfile,
  getCurrentProfile,
} from "../../actions/userProfileAction";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const EditUserProfile = ({
  profile: { userProfile, loading },
  createUserProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    name: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    resumelink: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {},
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      name: loading || !userProfile.name ? "" : userProfile.name,
      location: loading || !userProfile.location ? "" : userProfile.location,
      status: loading || !userProfile.status ? "" : userProfile.status,
      skills: loading || !userProfile.skills ? "" : userProfile.skills,
      githubusername:
        loading || !userProfile.githubusername ? "" : userProfile.githubusername,
      resumelink: loading || !userProfile.resumelink ? "" : userProfile.resumelink,
      bio: loading || !userProfile.bio ? "" : userProfile.bio,
      twitter: loading || !userProfile.social ? "" : userProfile.social.twitter,
      facebook: loading || !userProfile.social ? "" : userProfile.social.facebook,
      linkedin: loading || !userProfile.social ? "" : userProfile.social.linkedin,
      youtube: loading || !userProfile.social ? "" : userProfile.social.youtube,
      instagram: loading || !userProfile.social ? "" : userProfile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  // Destructuring
  const {
    displaySocialInputs,
    name,
    location,
    status,
    skills,
    githubusername,
    bio,
    resumelink,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    errors,
  } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createUserProfile(formData, history, true);
  };

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
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Could be your own company or one you work for
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
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>

          <div className="form-group">
            <input
              placeholder="Drive link for your resume"
              name="resumelink"
              value={resumelink}
              onChange={(e) => onChange(e)}></input>
            <small className="form-text">Link to your resume</small>
          </div>

          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              onClick={(event) =>
                setFormData({
                  ...formData,
                  displaySocialInputs: !displaySocialInputs,
                })
              }
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
          <Link to='/userdashboard' className="btn btn-light my-1" >
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

EditUserProfile.propTypes = {
  createUserProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.userProfileReducer,
});

export default connect(mapStateToProps, {
  createUserProfile,
  getCurrentProfile,
})(withRouter(EditUserProfile));



// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
// import SelectListGroup from '../common/SelectListGroup';
// import { createUserProfile, getCurrentProfile } from '../../actions/userProfileAction';
// import isEmpty from '../../validation/is-empty';

// const withRouter = (Component) => {
//   function ComponentWithRouterProp(props) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();
//     return <Component {...props} router={{ location, navigate, params }} />;
//   }
//   return ComponentWithRouterProp;
// }

// class CreateProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       displaySocialInputs: false,
//       name:'',
//       location: '',
//       status: '',
//       skills: '',
//       githubusername: '',
//       bio: '',
//       resumelink: '',
//       twitter: '',
//       facebook: '',
//       linkedin: '',
//       youtube: '',
//       instagram: '',
//       errors: {}
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   componentDidMount() {
//     this.props.getCurrentProfile();
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }

//     if (nextProps.profile.profile) {
//       const profile = nextProps.profile.profile;

//       // Bring skills array back to CSV
//       const skillsCSV = profile.skills.join(',');

//       // If profile field doesnt exist, make empty string
//       // profile.company = !isEmpty(profile.company) ? profile.company : '';
//       profile.name = !isEmpty(profile.name) ? profile.name : '';

//       profile.location = !isEmpty(profile.location) ? profile.location : '';
//       profile.githubusername = !isEmpty(profile.githubusername)
//         ? profile.githubusername
//         : '';
//       profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
//       profile.resumelink = !isEmpty(profile.resumelink) ? profile.resumelink : '';
//       profile.social = !isEmpty(profile.social) ? profile.social : {};
//       profile.twitter = !isEmpty(profile.social.twitter)
//         ? profile.social.twitter
//         : '';
//       profile.facebook = !isEmpty(profile.social.facebook)
//         ? profile.social.facebook
//         : '';
//       profile.linkedin = !isEmpty(profile.social.linkedin)
//         ? profile.social.linkedin
//         : '';
//       profile.youtube = !isEmpty(profile.social.youtube)
//         ? profile.social.youtube
//         : '';
//       profile.instagram = !isEmpty(profile.social.instagram)
//         ? profile.social.instagram
//         : '';

//       // Set component fields state
//       this.setState({
//         name: profile.name,
//         location: profile.location,
//         status: profile.status,
//         skills: skillsCSV,
//         githubusername: profile.githubusername,
//         bio: profile.bio,
//         resumelink:profile.resumelink,
//         twitter: profile.twitter,
//         facebook: profile.facebook,
//         linkedin: profile.linkedin,
//         youtube: profile.youtube,
//         instagram: this.state.instagram
//       });
//     }
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const profileData = {
//       name: this.state.name,
//       location: this.state.location,
//       status: this.state.status,
//       skills: this.state.skills,
//       githubusername: this.state.githubusername,
//       bio: this.state.bio,
//       resumelink:this.state.resumelink,
//       twitter: this.state.twitter,
//       facebook: this.state.facebook,
//       linkedin: this.state.linkedin,
//       youtube: this.state.youtube,
//       instagram: this.state.instagram
//     };

//     this.props.createProfile(profileData, this.props.history);
//   }

//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   render() {
//     const { errors, displaySocialInputs } = this.state;

//     let socialInputs;

//     if (displaySocialInputs) {
//       socialInputs = (
//         <div>
//           <InputGroup
//             placeholder="Twitter Profile URL"
//             name="twitter"
//             icon="fab fa-twitter"
//             value={this.state.twitter}
//             onChange={this.onChange}
//             error={errors.twitter}
//           />

//           <InputGroup
//             placeholder="Facebook Page URL"
//             name="facebook"
//             icon="fab fa-facebook"
//             value={this.state.facebook}
//             onChange={this.onChange}
//             error={errors.facebook}
//           />

//           <InputGroup
//             placeholder="Linkedin Profile URL"
//             name="linkedin"
//             icon="fab fa-linkedin"
//             value={this.state.linkedin}
//             onChange={this.onChange}
//             error={errors.linkedin}
//           />

//           <InputGroup
//             placeholder="YouTube Channel URL"
//             name="youtube"
//             icon="fab fa-youtube"
//             value={this.state.youtube}
//             onChange={this.onChange}
//             error={errors.youtube}
//           />

//           <InputGroup
//             placeholder="Instagram Page URL"
//             name="instagram"
//             icon="fab fa-instagram"
//             value={this.state.instagram}
//             onChange={this.onChange}
//             error={errors.instagram}
//           />
//         </div>
//       );
//     }

//     // Select options for status
//     const options = [
//       { label: '* Select Professional Status', value: 0 },
//       { label: 'Developer', value: 'Developer' },
//       { label: 'Junior Developer', value: 'Junior Developer' },
//       { label: 'Senior Developer', value: 'Senior Developer' },
//       { label: 'Manager', value: 'Manager' },
//       { label: 'Student or Learning', value: 'Student or Learning' },
//       { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
//       { label: 'Intern', value: 'Intern' },
//       { label: 'Other', value: 'Other' }
//     ];

//     return (
//       <div className="create-profile">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <Link to="/dashboard" className="btn btn-light">
//                 Go Back
//               </Link>
//               <h1 className="display-4 text-center">Edit Profile</h1>
//               <small className="d-block pb-3">* = required fields</small>
//               <form onSubmit={this.onSubmit}>
//                 <TextFieldGroup
//                   placeholder="* Name"
//                   name="name"
//                   value={this.state.handle}
//                   onChange={this.onChange}
//                   error={errors.handle}
//                   info="Your full name, company name, nickname"
//                 />
//                 <SelectListGroup
//                   placeholder="Status"
//                   name="status"
//                   value={this.state.status}
//                   onChange={this.onChange}
//                   options={options}
//                   error={errors.status}
//                   info="Give us an idea of where you are at in your career"
//                 />
//                 <TextFieldGroup
//                   placeholder="Location"
//                   name="location"
//                   value={this.state.location}
//                   onChange={this.onChange}
//                   error={errors.location}
//                   info="City or city & state suggested (eg. Boston, MA)"
//                 />
//                 <TextFieldGroup
//                   placeholder="* Skills"
//                   name="skills"
//                   value={this.state.skills}
//                   onChange={this.onChange}
//                   error={errors.skills}
//                   info="Please use comma separated values (eg.
//                     HTML,CSS,JavaScript,PHP"
//                 />
//                 <TextFieldGroup
//                   placeholder="Github Username"
//                   name="githubusername"
//                   value={this.state.githubusername}
//                   onChange={this.onChange}
//                   error={errors.githubusername}
//                   info="If you want your latest repos and a Github link, include your username"
//                 />
//                 <TextAreaFieldGroup
//                   placeholder="Short Bio"
//                   name="bio"
//                   value={this.state.bio}
//                   onChange={this.onChange}
//                   error={errors.bio}
//                   info="Tell us a little about yourself"
//                 />
//                 <TextAreaFieldGroup
//                   placeholder="Resume Link"
//                   name="resumelink"
//                   value={this.state.bio}
//                   onChange={this.onChange}
//                   error={errors.bio}
//                   info="Give your resume link"
//                 />

//                 <div className="mb-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       this.setState(prevState => ({
//                         displaySocialInputs: !prevState.displaySocialInputs
//                       }));
//                     }}
//                     className="btn btn-light"
//                   >
//                     Add Social Network Links
//                   </button>
//                   <span className="text-muted">Optional</span>
//                 </div>
//                 {socialInputs}
//                 <input
//                   type="submit"
//                   value="Submit"
//                   className="btn btn-info btn-block mt-4"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// CreateProfile.propTypes = {
//   createUserProfile: PropTypes.func.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile,
//   errors: state.errors
// });





