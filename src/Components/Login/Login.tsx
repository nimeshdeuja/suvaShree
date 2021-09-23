import { useContext, useRef } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { SignIn } from "../Server_requests/Firebase";

import { AuthContext } from "../Shared/AuthProvider";

interface LocationState {
    from: {
        pathname: string;
    };
}
const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { userData } = useContext(AuthContext);

    const location = useLocation<LocationState>();
    const { from } = location.state || { from: { pathname: "/dashboard" } };

    const signInHandler = () => {
        let email = emailRef.current?.value
        let password = passwordRef.current?.value
        if (email && password) SignIn(email, password)
    }

    if (userData) return <Redirect to={from} />;
    return (
        <div>
            From login
            <input type='text' defaultValue='imnimesh017@gmail.com' ref={emailRef} />
            <input type='text' defaultValue='qwerty' ref={passwordRef} />
            <button onClick={signInHandler}>Sign In</button>
        </div>
    )
}

export default Login
