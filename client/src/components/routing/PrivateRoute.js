import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

//check if to see any component will redirect to login page. if there is no authentication. //to be added in app.js
const PrivateRoute = ({
    component: Component, 
    auth: {isAuthenticated, loading}, ...rest
}) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login'/>): (<Component {...props}/>)}/>
)




PrivateRoute.propTypes = {
auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);