import PropTypes from "prop-types";
import { Fragment } from "react";
import Moment from "react-moment";

//Redux
import { connect } from "react-redux";
import { removeCommentAction } from "../../actions/post";

const CommentsItem = ({ comment, postID, removeCommentAction, auth }) => {
  return (
    <Fragment>
      <div className="col-md-12">
        <div className="posts-inner--post">
          <div className="posts-inner--post-details">
            <h2>{comment.text}</h2>
            <p>
              Posted by: {comment.fullName}
              <br />
              Posted on:{" "}
              <Moment format="YYYY/MM/DD, hh:mm">{comment.date}</Moment>
            </p>
            {auth.isLoaded && comment.user === auth.user._id && (
              <button
                onClick={(e) => removeCommentAction(postID, comment._id)}
                type="button"
                className="post-inner--buttons-btn"
              >
                <i className="fas fa-comment-slash"></i> Delete Comment
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CommentsItem.propTypes = {
  removeCommentAction: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const stateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(stateToProps, { removeCommentAction })(CommentsItem);
