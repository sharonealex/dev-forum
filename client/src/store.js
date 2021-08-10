import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //points to index.js of the reduce folder tht contains all the reducers for profile, auth, education etc.

const initialState = {}; // all initial state will be in reducers

const middleware = [thunk];

//create store

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
