import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import './App.css';


function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
    <Route exact path='/' component={Landing} />
    <section className="container">
      <Switch>
        <Route exact path="/signUp" component={SignUp}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </section>
    </div>
    </Router>
   
  );
}

export default App;
