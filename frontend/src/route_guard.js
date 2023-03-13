import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const RouteGuard = () => {

    function auth() {
        let flag;

        //check user has JWT token
        localStorage.getItem("token") ? flag = true : flag = false

        console.log("FLAAG")
        console.log(flag)

        return flag;
    }

    return auth() ? <Outlet/> : <Navigate to="/login"/>
};

export default RouteGuard;