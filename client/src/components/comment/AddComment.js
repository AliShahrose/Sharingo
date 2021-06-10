import { Fragment, useState } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { addCommentAction } from "../../actions/post";

const AddComment = ({ postID, addCommentAction }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addCommentAction(postID, { text });
    setText(" ");
  };

  return (
    <Fragment>
      <div className="post">
        <div className="post-inner">
          <div className="post-inner--info">
            <div className="post-inner--info-img"></div>
            <form
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <div className="row">
                <div className="col-md-10">
                  <div className="form-group">
                    <textarea
                      className="form-control commentBox"
                      placeholder="&#xF303; Your thoughts on this post..."
                      name={text}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <div className="cProfile-submit">
                      <input type="submit" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddComment.propTypes = {
  addCommentAction: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
};

export default connect(null, { addCommentAction })(AddComment);
