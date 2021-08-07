import React , {useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions'

const Dashboard = ({
    getCurrentProfile,
    auth: {user},
    profile: { profile, loading }
  }) => {
useEffect(()=>{
    getCurrentProfile()
}, []);

    return loading && profile === null ? <Spinner />: <div>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user" /> Welcome {user && user.name}
    </p>
    {profile != null ? <div><DashboardActions></DashboardActions></div>: <div> 
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </div>}
   
  </div>
}

Dashboard.propTypes = {
getCurrentProfile: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);