import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { deleteUserExperience } from '../../actions/userProfileAction';


const Experience = ({ experience, deleteUserExperience}) => {

  const experiences = experience.map(exp => (

    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format ='YYYY/MM/DD'> {exp.from}</Moment> - {
          exp.to === null ? ('Now') : (<Moment format ='YYYY/MM/DD'> {exp.to}</Moment> )
        } 
      </td>
     <td>
          <button  onClick={()=> deleteUserExperience(exp._id)} className='btn btn-danger'>Delete</button>
    </td> 
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experiences}
        </tbody>
      </table>
    </Fragment>
  )
}


Experience.propTypes= {

  experience: PropTypes.array.isRequired,
  deleteUserExperience: PropTypes.func.isRequired

};

export default connect (null,{deleteUserExperience}) (Experience) ;


















// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import { deleteExperience } from '../../actions/userProfileActions';

// class Experience extends Component {
//   onDeleteClick(id) {
//     this.props.deleteExperience(id);
//   }

//   render() {
//     const experience = this.props.experience.map(exp => (
//       <tr key={exp._id}>
//         <td>{exp.company}</td>
//         <td>{exp.title}</td>
//         <td>
//           <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
//           {exp.to === null ? (
//             ' Now'
//           ) : (
//             <Moment format="YYYY/MM/DD">{exp.to}</Moment>
//           )}
//         </td>
//         <td>
//           <button
//             onClick={this.onDeleteClick.bind(this, exp._id)}
//             className="btn btn-danger"
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     ));
//     return (
//       <div>
//         <h4 className="mb-4">Experience Credentials</h4>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Company</th>
//               <th>Title</th>
//               <th>Years</th>
//               <th />
//             </tr>
//             {experience}
//           </thead>
//         </table>
//       </div>
//     );
//   }
// }

// Experience.propTypes = {
//   deleteExperience: PropTypes.func.isRequired
// };

// export default connect(null, { deleteExperience })(Experience);

