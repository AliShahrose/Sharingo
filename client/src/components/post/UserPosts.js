import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PostsItem from "./PostsItem";

// Redux
import { connect } from "react-redux";
import { getUserAllPostsAction } from "../../actions/post";

const Posts = ({ id, getUserAllPostsAction, posts, isLoaded }) => {
  useEffect(() => {
    getUserAllPostsAction(id);
  }, [getUserAllPostsAction, id]);
  return !isLoaded ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="posts">
        <div className="posts-inner">
          <h1>
            <b>Posts</b>
          </h1>
          <div className="row">
            {posts.map((post) => (
              <PostsItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  id: PropTypes.string.isRequired,
  getUserAllPostsAction: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const stateToProps = (state) => ({
  posts: state.postReducer.posts,
  isLoaded: state.postReducer.isLoaded,
});

export default connect(stateToProps, { getUserAllPostsAction })(Posts);
