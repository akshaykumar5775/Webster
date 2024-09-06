import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const CompanyProfileItem = ({ profile :{
    company:{ _id, companyname},
    headquarters,
    services
}
}) =>
{
    return <div className='profile bg-light'>
     <div>
        <h2>{companyname}</h2>
        <p className='my-1'>{headquarters && <span>{headquarters}</span>}</p>
        <Link to = {`/companyProfile/${_id}`} className='btn btn-primary'>
            View profile
        </Link>
     </div>
     <ul>
        {services.slice(0,4).map((service,index) => (
            <li key={index} className="text-primary">
                <i className='fas fa-check'></i>{service}
            </li>
        ))}
     </ul>
    </div>;

};



CompanyProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};


export default CompanyProfileItem;