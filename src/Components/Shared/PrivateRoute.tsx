import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

interface PrivateRouteProps {
    exact: boolean,
    path: string,
    component: any
}
const PrivateRoute = ({ exact, path, component: RouteComponent }: PrivateRouteProps) => {
    const { userData } = useContext(AuthContext);
    return (
        <Route
            exact={exact}
            path={path}
            render={(props) => {
                if (userData) return <RouteComponent {...props} />
                return <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location },
                    }}
                />
            }
            }
        />
    )
}

export default PrivateRoute
