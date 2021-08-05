import react from 'react';
import { useState } from 'react';
const axios = require ('axios')

const SignUp = ()=>{

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
        console.log("passwords dont match")
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
     Already have an account? <a href="login.html">Sign In</a>
   </p></div>
        
    )
}

export default SignUp;