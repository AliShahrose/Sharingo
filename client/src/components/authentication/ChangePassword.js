import { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

// Redux
import { changePasswordAction } from "../../actions/auth";

const ChangePassword = ({ changePasswordAction, isAuth }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const { oldPassword, password, confirmPassword } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alertify.notify("Passwords do not match", "error", 3);
    } else {
      changePasswordAction({ oldPassword, password });
    }
  };

  // Kick out if not authenticated
  if (!isAuth) return <Redirect to="/SignIn" />;

  return (
    <Fragment>
      <div className="changePassword">
        <div className="changePassword-inner">
          <h1>Change Password</h1>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                className="form-input form-control"
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-input form-control"
                type="password"
                placeholder="New Password"
                name="password"
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
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <input type="submit" className="btn btn-color" value="Submit" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  changePasswordAction: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const stateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(stateToProps, { changePasswordAction })(ChangePassword);
