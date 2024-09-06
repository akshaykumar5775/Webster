import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {
  about,
  services,
//   user: {companyname}
}}) => {
    return (
        <div class="profile-about bg-light p-2">
            {about && (
                <Fragment>
                    {/* <h2 class="text-primary">{companyname}s About</h2> */}
                    <p>
                        {about}
                    </p>
          <div class="line"></div>

                </Fragment>
            )}
            
          <h2 class="text-primary">Services</h2>
          <div class="skills">
            {services.map((service,index) =>(
                <div key={index} className="p-1">
                    <i className='fas fa-check'></i>{service}
                    </div>
            ))}
          </div>
        </div>
    );
}


ProfileAbout.propTypes= {
    profile:PropTypes.object.isRequired
};

export default ProfileAbout;