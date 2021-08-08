import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";
import Alert from "./pages/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
//Redux
import { Provider } from "react-redux"; //connects react and redux
import store from "./store";
import CreateProfile from "./components/profileForms/CreateProfile";
import EditProfile from "./components/profileForms/EditProfile";
import AddExperience from "./components/profileForms/AddExperience";
import AddEducation from "./components/profileForms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts"

//wrapping with provider allows all compnents to access the state

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //component did Mount
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert></Alert>
            <Switch>
              <Route exact path="/signUp" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
               <PrivateRoute
                exact
                path="/posts"
                component={Posts}
              />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
