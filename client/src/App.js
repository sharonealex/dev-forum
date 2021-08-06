import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import './App.css';
import Alert from './pages/Alert';
//Redux
import {Provider} from 'react-redux';  //connects react and redux
import store from './store'

//wrapping with provider allows all compnents to access the state
function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
    <Navbar/>
    <Route exact path='/' component={Landing} />
    <section className="container">
      <Alert></Alert>
      <Switch>
        <Route exact path="/signUp" component={SignUp}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </section>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
