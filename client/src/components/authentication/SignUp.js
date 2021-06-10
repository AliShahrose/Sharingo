import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

// Redux
import { signUpAction } from "../../actions/auth";

const SignUp = ({ signUpAction, isAuth }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const { firstName, lastName, email, password, cPassword } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      alertify.notify("Passwords do not match", "error", 3);
    } else {
      signUpAction({ firstName, lastName, email, password });
    }
  };

  // Redirect in case of already authenticated
  if (isAuth) return <Redirect to="/Home" />;

  return (
    <Fragment>
      <div className="signup">
        <div className="signup-inner">
          <h1>Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                className="form-input form-control"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-input form-control"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
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
                minLength="8"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-input form-control"
                type="password"
                placeholder="Confirm Password"
                name="cPassword"
                minLength="8"
                value={cPassword}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <input type="submit" className="btn btn-color" value="Sign Up" />
          </form>
          <p className="navigate">
            Already have an account? <Link to="/SignIn">Sign In</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

SignUp.propTypes = {
  signUpAction: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const stateToProp = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(stateToProp, { signUpAction })(SignUp);
