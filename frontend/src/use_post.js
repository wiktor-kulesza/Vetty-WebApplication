import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as constants from './constants';

const UsePost = ({data, url}) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsPending(true);
        setError(null);

        try {
            const token = localStorage.getItem('token'); // get JWT token from local storage
            if (!token) {
                navigate(constants.LOGIN); // navigate to login page if token is not available
                return;
            }

            const response = await axios.post(url, data, {
                headers: {Authorization: `Bearer ${token}`} // add JWT token to request headers
            });
            setIsPending(false);
            setResponseData(response.data);
        } catch (error) {
            setIsPending(false);
            setError(error.message);
        }
    };

    handleSubmit();
    return {isPending, error, responseData};
};

export default UsePost;