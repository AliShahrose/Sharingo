import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, isAuth, isLoaded, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth && isLoaded ? <Redirect to="/SignIn" /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const stateToProp = (state) => ({
  isAuth: state.authReducer.isAuth,
  isLoaded: state.authReducer.isLoaded,
});

export default connect(stateToProp)(PrivateRoute);
