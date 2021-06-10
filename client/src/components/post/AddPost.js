import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// Redux
import { connect } from "react-redux";
import { addPostAction } from "../../actions/post";
import alertify from "alertifyjs";

const AddPost = ({ addPostAction, history }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [imageState, setImageState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const selectedImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageState(e.target.value);
      setFormData({ ...formData, [e.target.name]: reader.result });
      setPreviewSource(reader.result);
    };
  };

  const [formData, setFormData] = useState({
    image: "",
    caption: "",
  });

  const { caption } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.image === "")
      return alertify.notify("Please upload a photo", "error", 3);
    addPostAction(formData, history);
  };

  return (
    <Fragment>
      <div className="post">
        <div className="post-inner">
          <div className="post-inner--info">
            <h1>
              <b>Share something new</b>
            </h1>
            <div className="post-inner--info-img"></div>
            <form
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="file"
                      id="upload"
                      name="image"
                      onChange={selectedImage}
                      value={imageState}
                      accept="image/*"
                      hidden
                    />
                    <div>
                      {!previewSource && (
                        <label
                          className="form-control home-button-btn addPost-btn"
                          htmlFor="upload"
                        >
                          <i className="fas fa-file-image" />
                          <span className="hide-sm">Upload Photo*</span>
                        </label>
                      )}
                    </div>
                    <label htmlFor="upload" className="addPost-img">
                      {previewSource && (
                        <img src={previewSource} alt="Selected" />
                      )}
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-10">
                      <div className="form-group addPostBox">
                        <textarea
                          className="form-control"
                          placeholder="&#xF303; What's on your mind..."
                          name="caption"
                          value={caption}
                          onChange={(e) => onChange(e)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <div className="addPost-submit">
                          {!isMobile ? (
                            <input type="submit" />
                          ) : (
                            <button
                              className="home-button-btn submitButton"
                              type="submit"
                            >
                              <i className="fas fa-paper-plane"></i>
                            </button>
                          )}
                          {/* <button
                            className="home-button-btn submitButton"
                            type="submit"
                          >
                            <i className="fas fa-paper-plane"></i>
                          </button>
                          <span className="hide-sm">
                            <input type="submit" />
                          </span> */}
                        </div>
                      </div>
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

AddPost.propTypes = {
  addPostAction: PropTypes.func.isRequired,
};

export default connect(null, { addPostAction })(withRouter(AddPost));
