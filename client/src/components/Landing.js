import React from 'react';
import {Link} from 'react-router-dom'

const Landing = ()=>{
    return (                //static html output
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Forum</h1>
            <p className="lead">
              Create a developer profile, share posts and network with other developers
            </p>
            <div className="buttons">
              <Link to="/signUp" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
        
    )

}

export default Landing;
