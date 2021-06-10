import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const ProfilesItem = ({
  profile: {
    user: { _id, firstName, lastName },
    city,
    country,
    image: { url },
  },
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <Fragment>
      <div className="col-md-6">
        <div className="profiles-inner--profile">
          <div className="profiles-inner--profile-image small-img">
            <img src={url} alt={`${firstName} ${lastName}`} />
          </div>
          <div className="profiles-inner--profile-details">
            {!isMobile ? (
              <Fragment>
                <h1>
                  <b>{`${firstName} ${lastName}`}</b>
                </h1>
                <p>
                  <b>{`From ${city}, ${country}`}</b>
                </p>
              </Fragment>
            ) : (
              <Fragment>
                <b>{`${firstName} ${lastName}`}</b>

                <p>{`From ${city}, ${country}`}</p>
              </Fragment>
            )}

            <Link to={`/Profile/${firstName}${lastName}/${_id}`}>
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfilesItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfilesItem;
