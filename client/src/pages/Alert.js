import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// const Alert = props => {
//     if (props.alerts !== null && props.alerts.length > 0) {
//         return props.alerts.map((alert) => (  //to do destructure props
//             <div key={alert.id} className={`alert alert-${alert.alertType}`}>
//                 {alert.msg}
//             </div>

//         ))

//     }
// }

const Alert = (props) => 
     props.alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ));

 

Alert.propTypes = {
        alerts: PropTypes.array.isRequired
    }

    // mapping a redux state to a prop so that a component can access it
const mapStateToProps = state => ({
        alerts: state.alert
    })


export default connect(mapStateToProps)(Alert);