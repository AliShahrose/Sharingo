import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import AddComment from "../comment/AddComment";
import CommentsItem from "../comment/CommentsItem";
import { useMediaQuery } from "react-responsive";

// Redux
import { connect } from "react-redux";
import {
  getSinglePostAction,
  deletePostAction,
  addLikeAction,
  removeLikeAction,
} from "../../actions/post";

const SinglePost = ({
  getSinglePostAction,
  deletePostAction,
  addLikeAction,
  removeLikeAction,
  history,
  post,
  isLoaded,
  auth,
  match,
}) => {
  useEffect(() => {
    getSinglePostAction(match.params.id);
  }, [getSinglePostAction, match.params.id]);

  const [showAddComment, setShowAddComment] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  return post === null || !isLoaded ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="post">
        <div className="post-inner">
          <div className="post-inner--info">
            {!isMobile ? (
              <div className="post-inner--info-img">
                <img src={post.image.url} alt={post.fullName} />
              </div>
            ) : (
              <div className="post-inner--info-img-mobile">
                <img src={post.image.url} alt={post.fullName} />
              </div>
            )}
            <div className="post-inner--info-details">
              {post.caption && (
                <h1>
                  <b>{post.caption}</b>
                </h1>
              )}
              <p>
                <i className="fas fa-heart"></i>{" "}
                <span>{post.likes.length}</span>
              </p>
              <p>
                <i className="fas fa-user"></i> {post.fullName}
              </p>
              <p>
                <i className="fas fa-calendar-day"></i>{" "}
                <Moment format="YYYY/MM/DD, hh:mm">{post.date}</Moment>
              </p>
            </div>
          </div>
          <div className="post-inner--buttons">
            <button
              onClick={(e) => addLikeAction(post._id)}
              type="button"
              className="post-inner--buttons-btn"
            >
              <i className="fas fa-heart"></i>
            </button>
            <button
              onClick={(e) => removeLikeAction(post._id)}
              type="button"
              className="post-inner--buttons-btn"
            >
              <i className="fas fa-heart-broken"></i>
            </button>
            <button
              onClick={(e) => setShowAddComment(!showAddComment)}
              type="button"
              className="post-inner--buttons-btn"
            >
              <i className="fas fa-comment"></i>
            </button>
            {auth.isLoaded && post.user === auth.user._id && (
              <button
                onClick={(e) => deletePostAction(post._id, history)}
                type="button"
                className="post-inner--buttons-btn"
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
          {showAddComment && <AddComment postID={post._id} />}
          <div className="row">
            {post.comments.map((comment) => (
              <CommentsItem
                key={comment._id}
                comment={comment}
                postID={post._id}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SinglePost.propTypes = {
  getSinglePostAction: PropTypes.func.isRequired,
  deletePostAction: PropTypes.func.isRequired,
  addLikeAction: PropTypes.func.isRequired,
  post: PropTypes.object,
  isLoaded: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
};

const stateToProps = (state) => ({
  post: state.postReducer.post,
  isLoaded: state.postReducer.isLoaded,
  auth: state.authReducer,
});

export default connect(stateToProps, {
  getSinglePostAction,
  deletePostAction,
  addLikeAction,
  removeLikeAction,
})(withRouter(SinglePost));
