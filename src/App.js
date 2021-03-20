import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to="auth"/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
