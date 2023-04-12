import React, {useEffect} from "react";
import {withRouter} from "./with_router";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const Verify = (props) => {
    let location = props.router.location;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedJwt = parseJwt(token);

            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
            }
        }
    }, [location, props]);
};

export default withRouter(Verify);