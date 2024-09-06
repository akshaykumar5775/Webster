import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { deleteUserEducation } from '../../actions/userProfileAction';


const Education = ({ education, deleteUserEducation}) => {

  const educations = education.map(edu => (

    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format ='YYYY/MM/DD'> {edu.from}</Moment> - {
          edu.to === null ? ('Now') : (<Moment format ='YYYY/MM/DD'> {edu.to}</Moment> )
        } 
      </td>
     <td>
          <button onClick={()=>deleteUserEducation(edu._id)} className='btn btn-danger'>Delete</button>
    </td> 
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {educations}
        </tbody>
      </table>
    </Fragment>
  )
}


Education.propTypes= {

  education: PropTypes.array.isRequired,
  deleteUserEducation: PropTypes.func.isRequired

};

export default connect(null, { deleteUserEducation}) (Education) ;











// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import { deleteEducation } from '../../actions/userProfileActions';

// class Education extends Component {
//   onDeleteClick(id) {
//     this.props.deleteEducation(id);
//   }

//   render() {
//     const education = this.props.education.map(edu => (
//       <tr key={edu._id}>
//         <td>{edu.school}</td>
//         <td>{edu.degree}</td>
//         <td>
//           <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
//           {edu.to === null ? (
//             ' Now'
//           ) : (
//             <Moment format="YYYY/MM/DD">{edu.to}</Moment>
//           )}
//         </td>
//         <td>
//           <button
//             onClick={this.onDeleteClick.bind(this, edu._id)}
//             className="btn btn-danger"
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     ));
//     return (
//       <div>
//         <h4 className="mb-4">Education Credentials</h4>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>School</th>
//               <th>Degree</th>
//               <th>Years</th>
//               <th />
//             </tr>
//             {education}
//           </thead>
//         </table>
//       </div>
//     );
//   }
// }

// Education.propTypes = {
//   deleteEducation: PropTypes.func.isRequired
// };

// export default connect(null, { deleteEducation })(Education);



