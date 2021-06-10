import { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getSingleProfileAction } from "../../actions/profile";
import AddPost from "../post/AddPost";
import UserPosts from "../post/UserPosts";
import { useMediaQuery } from "react-responsive";

const SingleProfile = ({
  getSingleProfileAction,
  profile,
  auth,
  isLoaded,
  match,
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  const [buttonToggle, setButtonToggle] = useState({
    showAddPost: false,
    showAllPosts: false,
  });
  useEffect(() => {
    getSingleProfileAction(match.params.id);
    if (!isMobile) divref.current.scrollIntoView({ behavior: "smooth" });
  }, [getSingleProfileAction, match.params.id, buttonToggle, isMobile]);

  const divref = useRef(null);

  return profile === null || !isLoaded ? (
    <Fragment>
      <div ref={divref} />
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      <div className="profile">
        <div className="profile-inner">
          <div className="profile-inner--info">
            <div className="profile-inner--info-img">
              <img
                src={profile.image.url}
                alt={`${profile.user.firstName} ${profile.user.lastName}`}
              />
            </div>
            <div className="profile-inner--info-details">
              <h1>
                <b>{`${profile.user.firstName} ${profile.user.lastName}`}</b>
              </h1>
              <p>
                <i className="fas fa-map-marker-alt"></i>{" "}
                {`${profile.city}, ${profile.country}`}
              </p>
              <p>
                <i className="fas fa-birthday-cake"></i> {profile.dateOfBirth}
              </p>
              <p>
                {profile.gender === "Other" || profile.gender === "Unknown" ? (
                  <i className="fas fa-venus-mars"></i>
                ) : profile.gender === "Male" ? (
                  <i className="fas fa-mars"></i>
                ) : (
                  <i className="fas fa-venus"></i>
                )}
                {` ${profile.gender}`}
              </p>
              <p>
                <i className="fas fa-phone-alt"></i> {profile.phone}
              </p>
              {profile.socialMedia && (
                <div className="icons my-1">
                  {profile.socialMedia.facebook && (
                    <a
                      href={profile.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook fa-2x"></i>
                    </a>
                  )}
                  {profile.socialMedia.twitter && (
                    <a
                      href={profile.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                  )}
                  {profile.socialMedia.instagram && (
                    <a
                      href={profile.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram fa-2x"></i>
                    </a>
                  )}
                  {profile.socialMedia.linkedIn && (
                    <a
                      href={profile.socialMedia.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="profile-inner--bio">
                <div className="profile-inner--bio-desc">
                  <h1>
                    <b>Bio</b>
                  </h1>
                  <p>{profile.bio ? profile.bio : <em>N/A</em>}</p>
                </div>
                <br />
                <div className="profile-inner--bio-hobbies">
                  <h1>
                    <b>Hobbies</b>
                  </h1>
                  {profile.hobbies.length > 0 ? (
                    profile.hobbies.map((hobby) => (
                      <p key={hobby}>
                        <i className="fas fa-angle-double-right"></i>{" "}
                        <b>{hobby}</b>
                      </p>
                    ))
                  ) : (
                    <em>N/A</em>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-inner--education">
                <h1>
                  <b>Education</b>
                </h1>
                <p>
                  <b>Level:</b>{" "}
                  {profile.education && profile.education.level ? (
                    profile.education.level
                  ) : (
                    <em>N/A</em>
                  )}
                </p>
                <p>
                  <b>Degree:</b>{" "}
                  {profile.education && profile.education.degree ? (
                    profile.education.degree
                  ) : (
                    <em>N/A</em>
                  )}
                </p>
                <p>
                  <b>Institute:</b>{" "}
                  {profile.education && profile.education.institute ? (
                    profile.education.institute
                  ) : (
                    <em>N/A</em>
                  )}
                </p>
                <p>
                  <b>Graduation Date:</b>{" "}
                  {profile.education && profile.education.graduationDate ? (
                    profile.education.graduationDate
                  ) : (
                    <em>N/A</em>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="home-button" style={{ marginBottom: "20px" }}>
            {auth.isLoaded && auth.user._id === profile.user._id ? (
              <Fragment>
                <button
                  onClick={(e) =>
                    setButtonToggle({
                      ...buttonToggle,
                      showAddPost: !buttonToggle.showAddPost,
                    })
                  }
                  className="home-button-btn"
                  style={{ border: "none" }}
                >
                  <i className="fas fa-file-signature"></i> Add New Post
                </button>
                <button
                  onClick={(e) =>
                    setButtonToggle({
                      ...buttonToggle,
                      showAllPosts: !buttonToggle.showAllPosts,
                    })
                  }
                  className="home-button-btn "
                  style={{ border: "none" }}
                >
                  <i className="fas fa-file-alt"></i> Show All Posts
                </button>
              </Fragment>
            ) : (
              <button
                onClick={(e) => {
                  setButtonToggle({
                    ...buttonToggle,
                    showAllPosts: !buttonToggle.showAllPosts,
                  });
                }}
                className="home-button-btn"
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  border: "none",
                }}
              >
                <i className="fas fa-file-alt"></i> Show All Posts
              </button>
            )}
          </div>
          <div id="scrollHere">
            {auth.isLoaded &&
              auth.user._id === profile.user._id &&
              buttonToggle.showAddPost && <AddPost />}
            {buttonToggle.showAllPosts && <UserPosts id={profile.user._id} />}
          </div>
        </div>
        <div ref={divref} />
      </div>
    </Fragment>
  );
};

SingleProfile.propTypes = {
  getSingleProfileAction: PropTypes.func.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const stateToProps = (state) => ({
  profile: state.profileReducer.profile,
  auth: state.authReducer,
  isLoaded: state.profileReducer.isLoaded,
});

export default connect(stateToProps, { getSingleProfileAction })(SingleProfile);
