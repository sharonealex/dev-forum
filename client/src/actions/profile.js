import axios from "axios";
import { Router } from "react-router-dom";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profiles/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


//get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE
  });
  try {
    const res = await axios.get("/api/profiles");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



//get profile by user id. each user has a profile
export const getProfileById = userId => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE
  });
  try {
    const res = await axios.get(`/api/profiles/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};




//get github repo
export const getGithubRepos = username => async (dispatch) => {
  // dispatch({
  //   type: CLEAR_PROFILE
  // });
  try {
    const res = await axios.get(`/api/profiles/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


//create profile
//history object has the push method for redirect
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profiles", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/dashboard"); //thisis how we do in actions
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

//ADD EXPERIENCE

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profiles/experience", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard"); //thisis how we do in actions
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//educ

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profiles/education", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard"); //thisis how we do in actions
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete exp


export const deleteExperience = id => async dispatch => {
 try{
   const res = await axios.delete(`/api/profiles/experience/${id}`);
   dispatch({
     type: UPDATE_PROFILE,
     payload: res.data
   })
   dispatch(setAlert("experience removed", "success"));
 } catch(err){
   dispatch({
     type: PROFILE_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
   })
 }
}

//delte edu

export const deleteEducation = id => async dispatch => {
  try{
    const res = await axios.delete(`/api/profiles/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert("education removed", "success"));
  } catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
 }


//delete account. and also associated profile.

export const deleteAccount = id => async dispatch => {
  if(window.confirm('are you sure this cannont be UNdone?')){
    try{
      const res = await axios.delete(`/api/profiles`);
      dispatch({
        type: CLEAR_PROFILE
      })
      dispatch({
        type: ACCOUNT_DELETED
      })
      dispatch(setAlert("YOUR account deleted permanently", "success"));
    } catch(err){
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
 
 }