import axios from 'axios';

//adding a global header, by setting if token in local storage


const setAuthToken = token => {
if(token){
    axios.defaults.headers.common['Authorization'] = token
} 
else {
    delete axios.defaults.headers.common['Authorization'];
}
}

export default setAuthToken;