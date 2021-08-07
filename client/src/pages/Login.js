import react from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {login} from '../actions/auth'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'


const Login = (props)=>{

const [formData, setFormData] = useState({
   
    email: '',
    password: ''
   
});

const { email, password } = formData; //fetching from current state object //rename password name


const handleInputChange = (event)=>{
    setFormData({...formData, [event.target.name]: event.target.value})
}

const handleFormSubmit = async (event)=>{
    event.preventDefault();
    props.login(email, password)
    } 



    return (             
   <div> <h1 className="large text-primary">Login</h1>
   <p className="lead"><i className="fas fa-user"></i> Login to Your Account</p>
   <form className="form" onSubmit={e => handleFormSubmit(e) }>
    
     <div className="form-group">
       <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => handleInputChange(e) } />
      
     </div>
     <div className="form-group">
       <input
         type="password"
         placeholder="Password"
         name="password"
         value={password} onChange={e => handleInputChange(e) }
         minLength="6"
       />
     </div>
   
     <input type="submit" className="btn btn-primary" value="Login" />
   </form>
   <p className="my-1">
     dont have an account? <Link to="/signUp">Sign Up</Link>
   </p></div>
        
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(null, {login})(Login)