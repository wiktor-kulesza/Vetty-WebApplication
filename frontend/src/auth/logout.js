import {useEffect} from 'react';

function LogoutIfJwtExpired() {
    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            const jwtExpirationDate = new Date(JSON.parse(atob(jwt.split('.')[1])).exp * 1000);
            const currentDate = new Date();
            if (jwtExpirationDate < currentDate) {
                localStorage.removeItem('token');
                window.location.reload();
            }
        }
    }, []);

    return null;
}

export default LogoutIfJwtExpired;