import {Link, useNavigate} from "react-router-dom";
import * as constants from './constants';

const Navbar = () => {
    const buttonText = localStorage.getItem('token') ? 'Logout' : 'Sign up';

    const navigate = useNavigate();

    const handleButtonClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            // Remove the JWT token from local storage and redirect to the home page
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            navigate('/');
            window.location.reload();
        } else {
            // Redirect to the register page
            navigate(constants.REGISTER);
        }
    };

    return (
        <nav className="navbar">
            <h1>Vetty</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/forum">Forum</Link>
                {!localStorage.getItem('token') &&
                <Link to="/login">Login</Link>}
                <button onClick={handleButtonClick} style={{
                    color: 'white',
                    backgroundColor: '#368F8B',
                    borderRadius: '10px',
                    marginLeft: '10px'
                }}>{buttonText}</button>
            </div>
        </nav>
    );
}

export default Navbar;
