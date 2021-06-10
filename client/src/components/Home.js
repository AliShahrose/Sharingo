import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteAccountAction,
  getCurrentProfileAction,
} from "../actions/profile";
import Spinner from "./layout/Spinner";
import Posts from "./post/Posts";
import AddPost from "./post/AddPost";

const Home = ({
  getCurrentProfileAction,
  deleteAccountAction,
  user,
  profile,
  isLoaded,
}) => {
  useEffect(() => {
    getCurrentProfileAction();
  }, [getCurrentProfileAction]);

  const [buttonToggle, setButtonToggle] = useState({
    showAddPost: false,
    showAllPosts: false,
  });

  return isLoaded === false && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="home">
        <h1>
          <i className="fas fa-user"></i>{" "}
          {user && `${user.firstName} ${user.lastName}`}
        </h1>
        {profile !== null ? (
          <Fragment>
            <div className="home-inner">
              <div className="home-button">
                <Link to="/UpdateProfile" className="home-button-btn">
                  <i className="fas fa-user-plus"></i>
                  <span className="hide-sm">Update Profile</span>
                </Link>
                <Link to="/Discover" className="home-button-btn">
                  <i className="fas fa-users"></i>
                  <span className="hide-sm">Discover</span>
                </Link>
                <button
                  onClick={(e) =>
                    setButtonToggle({
                      ...buttonToggle,
                      showAllPosts: !buttonToggle.showAllPosts,
                    })
                  }
                  className="home-button-btn"
                  style={{ border: "none" }}
                >
                  <i className="fas fa-file-alt"></i>
                  <span className="hide-sm">Posts</span>
                </button>
                <button
                  onClick={(e) =>
                    setButtonToggle({
                      ...buttonToggle,
                      showAddPost: !buttonToggle.showAddPost,
                    })
                  }
                  to="/AddPost"
                  className="home-button-btn"
                  style={{ border: "none" }}
                >
                  <i className="fas fa-file-signature"></i>
                  <span className="hide-sm">Add Post</span>
                </button>
                <Link to="/ChangePassword" className="home-button-btn">
                  <i className="fas fa-key"></i>
                  <span className="hide-sm">Change Password</span>
                </Link>
                <a
                  href="#!"
                  className="home-button-btn"
                  onClick={() => deleteAccountAction()}
                >
                  <i className="fas fa-user-times"></i>
                  <span className="hide-sm">Delete Account</span>
                </a>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="home-inner">
              <p className="lead home-desc">
                To start sharing photos, you need to create a profile first.
              </p>
              <div className="home-button">
                <Link to="/CreateProfile" className="home-button-btn">
                  <i className="fas fa-user-plus"></i> Create Profile
                </Link>
                <Link to="/Discover" className="home-button-btn">
                  <i className="fas fa-users"></i> Discover
                </Link>
                <Link to="/Posts" className="home-button-btn">
                  <i className="fas fa-file-alt"></i> Posts
                </Link>
                <Link to="/ChangePassword" className="home-button-btn">
                  <i className="fas fa-key"></i> Change Password
                </Link>
              </div>
            </div>
          </Fragment>
        )}
        {buttonToggle.showAddPost && <AddPost />}
        {buttonToggle.showAllPosts && <Posts />}
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  getCurrentProfileAction: PropTypes.func.isRequired,
  deleteAccountAction: PropTypes.func.isRequired,
  user: PropTypes.object,
  profile: PropTypes.object,
  isLoaded: PropTypes.bool.isRequired,
};

const stateToProps = (state) => ({
  user: state.authReducer.user,
  profile: state.profileReducer.profile,
  isLoaded: state.profileReducer.isLoaded,
});

export default connect(stateToProps, {
  getCurrentProfileAction,
  deleteAccountAction,
})(Home);
