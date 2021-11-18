import React from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

const ResetPassword = () => {
    const { search } = useLocation();
    console.log(search);
    const { email } = queryString.parse(search);

    return (
        <div>
            <h1>reset Password</h1>
            <h1>{email}</h1>
            
        </div>
    )
}

export default ResetPassword
