import react from 'react';
import { useState } from 'react';

const SignUp = ()=>{

const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
});

const {name, email, password, password2} = formData; //fetching from current state object


const handleInputChange = (event)=>{
    setFormData({...formData, [event.target.name]: event.target.value})
}

const handleFormSubmit = (event)=>{
    event.preventDefault();
    if(password !== password2){
        console.log("passwords dont match")
    } else {
        console.log(formData)
       
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
         >This site uses Gravatar so if you want a profile image, use a
         Gravatar email</small
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
     Already have an account? <a href="login.html">Sign In</a>
   </p></div>
        
    )
}

export default SignUp;