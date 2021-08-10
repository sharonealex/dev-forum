import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux"; //to interact with state to see if logged in
import PropTypes from "prop-types";

const Landing = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }
  return (
    //static html output
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Forum</h1>
          <p className="lead">
            Create a developer profile, share posts and connect with people who
            can help.
          </p>
          <div className="buttons">
            <Link to="/signUp" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps)(Landing);
