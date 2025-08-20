import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, isLoggedIn, ...others }) => {
    const location = useLocation();
    
    return isLoggedIn ? (
        <Component {...others} />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

const mapStateToProps = state => ({
    ...state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);
