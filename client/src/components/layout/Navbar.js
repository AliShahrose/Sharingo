import { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { signOutAction } from "../../actions/auth";

const Navbar = ({ auth, signOutAction }) => {
  const isAuthLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link
          className="nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          to="/Home"
        >
          <i className="fas fa-home" />
          <span className="hide-sm">Home</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          to={
            auth.user
              ? `/Profile/${auth.user.firstName}${auth.user.lastName}/${auth.user._id}`
              : ""
          }
        >
          <i className="fas fa-user" />
          <span className="hide-sm">
            {" "}
            {auth.user ? auth.user.firstName : "Profile"}
          </span>
        </Link>
      </li>
      <li className="nav-item">
        <a
          onClick={signOutAction}
          className="nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          href="#!"
        >
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Sign Out</span>
        </a>
      </li>
    </ul>
  );

  const unAuthLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/SignIn">
          Sign In
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/SignUp">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light nav-color">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth.isLoaded && (
              <Fragment>{auth.isAuth ? isAuthLinks : unAuthLinks}</Fragment>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  signOutAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const stateToProp = (state) => ({
  auth: state.authReducer,
});

export default connect(stateToProp, { signOutAction })(Navbar);
