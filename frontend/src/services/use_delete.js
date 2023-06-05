import axios from 'axios';
import {useNavigate} from 'react-router-dom';

async function useDelete(url) {
    const navigate = useNavigate();
    const jwt = localStorage.getItem('token');
    if (jwt) {
        try {
            const response = await axios.delete(url, {
                headers: {Authorization: `Bearer ${jwt}`}
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                if (error.response && error.response.status === 401) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // JWT token is expired or invalid
                    console.log('JWT token expired or invalid');
                    // navigate to login view or show login modal
                    navigate('/login');
                } else if (error.response && error.response.status === 403) {
                    // Not authorized to access resource
                    console.log('Not Authorized! Server returned a 403 error');
                    // show error message to user
                } else if (error.response && error.response.status === 404) {
                    // resource not found on server
                    console.log('Server returned a 404 error');
                    // show error message to user
                } else {
                    // handle other server errors
                    console.log('Server returned an error:', error);
                    // show error message to user
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            // rethrow the error to be handled by the caller
            throw error;
        }
    } else {
        // navigate to login view if there's no JWT token
        navigate('/login');
    }
}

export default useDelete;