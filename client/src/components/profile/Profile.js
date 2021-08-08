import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import { getProfileById } from '../../actions/profile';


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
      getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

  return (
    <div>
      {profile === null || loading ? 
        <Spinner />
       : 
        <div>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>

          
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          </div>}
    </div>
  );
};


Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth //to see if the user is logged in. then they can edit profile
  });
  
  export default connect(mapStateToProps, { getProfileById })(Profile);