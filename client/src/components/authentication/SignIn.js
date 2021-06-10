import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { signInAction } from "../../actions/auth";

const SignIn = ({ signInAction, isAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    signInAction({ email, password });
  };

  // Redirect in case of already authenticated
  if (isAuth) return <Redirect to="/Home" />;

  return (
    <Fragment>
      <div className="signin">
        <div className="signin-inner">
          <h1>Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Sign Into Your Account
          </p>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                className="form-input form-control"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-input form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <input type="submit" className="btn btn-color" value="Sign In" />
          </form>
          <p className="navigate">
            Don't have an account? <Link to="/SignUp">Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

SignIn.propTypes = {
  signInAction: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const stateToProp = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(stateToProp, { signInAction })(SignIn);
