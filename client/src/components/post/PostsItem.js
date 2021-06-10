import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useMediaQuery } from "react-responsive";

const PostsItem = ({
  post: {
    _id,
    fullName,
    date,
    caption,
    image: { url },
  },
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <Fragment>
      <div className="col-md-6">
        <div className="posts-inner--post">
          {!isMobile ? (
            <div className="posts-inner--post-image">
              <img src={url} alt={caption} />
            </div>
          ) : (
            <div className="posts-inner--post-img">
              <img src={url} alt={caption} />
            </div>
          )}
          <div className="posts-inner--post-details">
            <h1>
              <span className="hide-sm">
                <b> {caption}</b>
              </span>
            </h1>
            <p>
              <b>Posted by: {fullName}</b>
            </p>
            <p>
              <b>
                Posted on: <Moment format="YYYY/MM/DD, hh:mm">{date}</Moment>
              </b>
            </p>
            <Link to={`/Post/${fullName}/${_id}`}>View Post</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostsItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostsItem;
