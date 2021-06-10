import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import ProfilesItem from "./ProfilesItem";

// Redux
import { connect } from "react-redux";
import { getAllProfilesAction } from "../../actions/profile";

const Profiles = ({ getAllProfilesAction, profiles, isLoaded }) => {
  useEffect(() => {
    getAllProfilesAction();
  }, [getAllProfilesAction]);
  return !isLoaded ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="profiles">
        <div className="profiles-inner">
          <h1>
            <b>People of Sharingo</b>
          </h1>
          <div className="row">
            {profiles.map((profile) => (
              <ProfilesItem key={profile._id} profile={profile} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfilesAction: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const stateToProps = (state) => ({
  profiles: state.profileReducer.profiles,
  isLoaded: state.profileReducer.isLoaded,
});

export default connect(stateToProps, { getAllProfilesAction })(Profiles);
