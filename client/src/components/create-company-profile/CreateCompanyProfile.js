import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/companyProfileAction';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

const CreateCompanyProfile = ({ createProfile, history }) => {

  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    companyname: '',
    website: '',
    headquarters: '',
    services: '',
    about: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  });


  const {
    displaySocialInputs,
    website,
    headquarters,
    services,
    about,
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

    createProfile(formData, history);
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
            <input
              placeholder="Website"
              name="website"
              value={website}
              onChange={(e) => onChange(e)}></input>
            <small className="form-text">Enter your website</small>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Headquarters"
              name="headquarters"
              value={headquarters}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="* Services"
              name="services"
              value={services}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Please use comma separated values
            </small>
          </div>

          <div className="form-group">
            <textarea
              placeholder="About the company"
              name="about"
              value={about}
              onChange={(e) => onChange(e)}></textarea>
            <small className="form-text">Tell us  about your company</small>
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
          <Link to='/companydashboard' className="btn btn-light my-1">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
}

CreateCompanyProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(
  withRouter(CreateCompanyProfile)
);





// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
// import SelectListGroup from '../common/SelectListGroup';
// import { createProfile } from '../../actions/companyProfileAction';

// class CreateProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       displaySocialInputs: false,
//       companyname: '',
//       website:'',
//       headquarters: '',
//       services: '',
//       about: '',
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

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const profileData = {
//       companyname: this.state.companyname,
//       website: this.state.website,
//       headquarters: this.state.headquarters,
//       services: this.state.services,
//       about: this.state.about,
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
   

//     return (
//       <div className="create-profile">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <h1 className="display-4 text-center">Create Your Profile</h1>
//               <p className="lead text-center">
//                 Let's get some information to make your profile stand out
//               </p>
//               <small className="d-block pb-3">* = required fields</small>
//               <form onSubmit={this.onSubmit}>
//                 <TextFieldGroup
//                   placeholder="Company Name"
//                   name="companyname"
//                   value={this.state.companyname}
//                   onChange={this.onChange}
//                   error={errors.companyname}
//                   info="Your company name"
//                 />
//                 <TextFieldGroup
//                   placeholder="Company Website"
//                   name="website"
//                   value={this.state.website}
//                   onChange={this.onChange}
//                   error={errors.website}
//                   info="Your company website"
//                 />
//                 <TextFieldGroup
//                   placeholder="headquarters"
//                   name="headquarters"
//                   value={this.state.headquarters}
//                   onChange={this.onChange}
//                   error={errors.headquarters}
//                   info="City or city & state suggested (eg. Boston, MA)"
//                 />
//                 <TextFieldGroup
//                   placeholder="* Services"
//                   name="services"
//                   value={this.state.services}
//                   onChange={this.onChange}
//                   error={errors.services}
//                   info=""
//                 />
                
//                 <TextAreaFieldGroup
//                   placeholder="About"
//                   name="about"
//                   value={this.state.about}
//                   onChange={this.onChange}
//                   error={errors.about}
//                   info="Tell us a little about company"
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
//   profile: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile,
//   errors: state.errors
// });

// export default connect(mapStateToProps, { createProfile })(
//   withRouter(CreateProfile)
// );
