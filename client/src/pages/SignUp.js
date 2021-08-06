import react from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux'
import {setAlert} from '../actions/alert'
import PropTypes from 'prop-types';
const axios = require ('axios');




const SignUp = (props)=>{

const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
});

const {name, email, password, password2} = formData; //fetching from current state object //rename password name


const handleInputChange = (event)=>{
    setFormData({...formData, [event.target.name]: event.target.value})
}

const handleFormSubmit = async (event)=>{
    event.preventDefault();
    if(password !== password2){
        props.setAlert("passwords dont match", "danger") //pass this as a message to our actions, . It will generate an id and dispatch sest alert with this  message.it to 
    } else {
        console.log(formData);
        const newUser = {
            name,
            email,
            password
        }
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(newUser);
            const response = await axios.post('/api/users', body, config)
            console.log(response);
        }catch (err){
console.log(err)
        }
       
    }
}


    return (             
   <div> <h1 className="large text-primary">Sign Up</h1>
   <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
   <form className="form" onSubmit={e => handleFormSubmit(e) }>
     <div className="form-group">
       <input type="text" placeholder="Name" name="name" value={name} onChange={e => handleInputChange(e) } required />
     </div>
     <div className="form-group">
       <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => handleInputChange(e) } />
       <small className="form-text"
         ></small
       >
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
     <div className="form-group">
       <input
         type="password"
         placeholder="Confirm Password"
         name="password2"
         value={password2} onChange={e => handleInputChange(e) }
         minLength="6"
       />
     </div>
     <input type="submit" className="btn btn-primary" value="Register" />
   </form>
   <p className="my-1">
     Already have an account? <Link to="/login">Sign In</Link>
   </p></div>
        
    )
}

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  SignUp: PropTypes.func.isRequired
};


export default connect(null, {setAlert})(SignUp);

//to use an action pass it into connect
//connect takes any state that we want to map as a prop.
//second any object that you need actions to do.
// setAlert is sent as a prop to the component. it maps state to prop.