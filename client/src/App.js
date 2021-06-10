import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setHeaderToken from "./utilities/token";

// Components
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routes/Routes";

// Set token
if (localStorage.token) setHeaderToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Routes component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
