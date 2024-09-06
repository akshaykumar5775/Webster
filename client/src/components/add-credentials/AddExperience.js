import React, { Fragment , useState } from 'react';
import {Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserExperience } from '../../actions/userProfileAction';



const AddExperience = ({addUserExperience, history}) =>{
  const [ formData , setFormData ] = useState({

      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: ''
  });
  
  const [toDateDisabled, toggleDisabled] =useState(false);

  const { company, title, location, from, to, current, description} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
  return (
    <Fragment>

               <h1 className="large text-primary">Add Experience</h1>
               <p className="lead">
                 Add any job or position that you have had in the past or current
               </p>
               <small>* = required fields</small>
               <form  className= 'form'
               onSubmit={e=>{
                e.preventDefault();
                addUserExperience(formData,history);
              }}>
                 

                 <div className= "form-group">
                 <input
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={e=>onChange(e)}
                />
                </div>

                 <div className= "form-group">
                <input
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={e=>onChange(e)}
                />
                </div>

                <div className= "form-group">
                <input
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={e=>onChange(e)}
                />
                </div>

                <div className= "form-group">
                <h6>From Date</h6>
                <input
                  name="from"
                  type="date"
                  value={from}
                  onChange={e=>onChange(e)}
                />
                </div>

                <div className="form-group">
                  <p>
                  <input
                    type="checkbox"
                    name="current"
                    checked={current}
                    value={current}
                    onChange={e=>{
                      setFormData({...formData, current: !current});
                      toggleDisabled(!toDateDisabled);
                    }}
                  />{' '}Current job </p>
                </div>
                

                <div className= "form-group">
                <h6>To Date</h6>
                <input
                  name="to"
                  type="date"
                  value={to}
                  onChange={e=>onChange(e)}
                  disabled={toDateDisabled ? 'disabled' : ''}
                />
                </div>


                <div className= "form-group">
                <textarea
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={e=>onChange(e)}
                  info="Tell us about the the position"
                ></textarea>
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary my-1"
                />
               
               <Link to="/userdashboard" className="btn btn-light my-1">
                Go Back
               </Link>
  

              </form>
    </Fragment>
  )
}




AddExperience.propTypes = {
  addUserExperience: PropTypes.func.isRequired
};

export default connect(null, { addUserExperience })(AddExperience);








// class AddExperience extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       company: '',
//       title: '',
//       location: '',
//       from: '',
//       to: '',
//       current: false,
//       description: '',
//       errors: {},
//       disabled: false
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onCheck = this.onCheck.bind(this);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const expData = {
//       company: this.state.company,
//       title: this.state.title,
//       location: this.state.location,
//       from: this.state.from,
//       to: this.state.to,
//       current: this.state.current,
//       description: this.state.description
//     };

//     this.props.addExperience(expData, this.props.history);
//   }

//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   onCheck(e) {
//     this.setState({
//       disabled: !this.state.disabled,
//       current: !this.state.current
//     });
//   }

//   render() {
//     const { errors } = this.state;

//     return (
//       <div className="add-experience">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <Link to="/dashboard" className="btn btn-light">
//                 Go Back
//               </Link>
//               <h1 className="display-4 text-center">Add Experience</h1>
//               <p className="lead text-center">
//                 Add any job or position that you have had in the past or current
//               </p>
//               <small className="d-block pb-3">* = required fields</small>
//               <form onSubmit={this.onSubmit}>
//                 <TextFieldGroup
//                   placeholder="* Company"
//                   name="company"
//                   value={this.state.company}
//                   onChange={this.onChange}
//                   error={errors.company}
//                 />
//                 <TextFieldGroup
//                   placeholder="* Job Title"
//                   name="title"
//                   value={this.state.title}
//                   onChange={this.onChange}
//                   error={errors.title}
//                 />
//                 <TextFieldGroup
//                   placeholder="Location"
//                   name="location"
//                   value={this.state.location}
//                   onChange={this.onChange}
//                   error={errors.location}
//                 />
//                 <h6>From Date</h6>
//                 <TextFieldGroup
//                   name="from"
//                   type="date"
//                   value={this.state.from}
//                   onChange={this.onChange}
//                   error={errors.from}
//                 />
//                 <h6>To Date</h6>
//                 <TextFieldGroup
//                   name="to"
//                   type="date"
//                   value={this.state.to}
//                   onChange={this.onChange}
//                   error={errors.to}
//                   disabled={this.state.disabled ? 'disabled' : ''}
//                 />
//                 <div className="form-check mb-4">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     name="current"
//                     value={this.state.current}
//                     checked={this.state.current}
//                     onChange={this.onCheck}
//                     id="current"
//                   />
//                   <label htmlFor="current" className="form-check-label">
//                     Current Job
//                   </label>
//                 </div>
//                 <TextAreaFieldGroup
//                   placeholder="Job Description"
//                   name="description"
//                   value={this.state.description}
//                   onChange={this.onChange}
//                   error={errors.description}
//                   info="Tell us about the the position"
//                 />
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

// AddExperience.propTypes = {
//   addExperience: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile,
//   errors: state.errors
// });

// export default connect(mapStateToProps, { addExperience })(
//   withRouter(AddExperience)
// );