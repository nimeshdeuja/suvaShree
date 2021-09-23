import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";

import Login from "./Components/Login/Login";
import { AuthProvider } from "./Components/Shared/AuthProvider";
import PrivateRoute from "./Components/Shared/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
