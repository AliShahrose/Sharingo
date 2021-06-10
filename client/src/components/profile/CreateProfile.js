import { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import defaultImage from "../../images/defaultPic.png";
import { connect } from "react-redux";
import { createOrUpdateProfileAction } from "../../actions/profile";

const CreateProfile = ({ createOrUpdateProfileAction, history }) => {
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
    bio: "",
    dateOfBirth: "",
    gender: "",
    city: "",
    country: "",
    phone: "",
    hobbies: "",
    image: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedIn: "",
    level: "",
    degree: "",
    institute: "",
    graduationDate: "",
  });

  const {
    bio,
    dateOfBirth,
    gender,
    city,
    country,
    phone,
    hobbies,
    facebook,
    twitter,
    instagram,
    linkedIn,
    level,
    degree,
    institute,
    graduationDate,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createOrUpdateProfileAction(formData, history);
  };
  return (
    <Fragment>
      <div className="cProfile">
        <h1>Create Profile</h1>
        <p className="lead">
          <i className="fas fa-user-edit"></i> Tell us about yourself
        </p>
        <div className="cProfile-inner">
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="cProfile-general">
                  <h4>General Information</h4>
                  <div className="row">
                    <div className="col-md-6">
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
                      </div>
                      <label htmlFor="upload" id="preview">
                        <img
                          src={previewSource ? previewSource : defaultImage}
                          alt="Selected"
                        />
                      </label>
                      {/* <label
                          className="form-control"
                          htmlFor="upload"
                        >
                          <i className="fas fa-file-image" /> Upload Photo
                        </label> */}
                      <div className="form-group form-group-textBox">
                        <textarea
                          placeholder="&#xF303; A short bio of yourself"
                          name="bio"
                          value={bio}
                          onChange={(e) => onChange(e)}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="&#xF1FD; Date of Birth*"
                          name="dateOfBirth"
                          value={dateOfBirth}
                          onChange={(e) => onChange(e)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          name="gender"
                          className="form-control"
                          value={gender}
                          onChange={(e) => onChange(e)}
                          required
                        >
                          <option value="" hidden>
                            &#xF228; Gender*
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Unknown">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="&#xF64F; City*"
                          name="city"
                          value={city}
                          onChange={(e) => onChange(e)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="&#xF7A2; Country*"
                          name="country"
                          value={country}
                          onChange={(e) => onChange(e)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="&#xF879; Phone*"
                          name="phone"
                          value={phone}
                          onChange={(e) => onChange(e)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="&#xF02D; Hobbies"
                          name="hobbies"
                          value={hobbies}
                          onChange={(e) => onChange(e)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="cProfile-social">
                  <h4>Social Information</h4>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="&#xF09a; Facebook URL"
                        name="facebook"
                        value={facebook}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="&#xF099; Twitter URL"
                        name="twitter"
                        value={twitter}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="&#xE055; Instagram URL"
                        name="instagram"
                        value={instagram}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="&#xF08c; LinkedIn URL"
                        name="linkedIn"
                        value={linkedIn}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="cProfile-education">
                  <h4>Educational Information</h4>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="&#xF5FD; Level"
                        name="level"
                        value={level}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="&#xF19C; Institute"
                        name="institute"
                        value={institute}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="&#xF19D; Degree"
                        name="degree"
                        value={degree}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="&#xF274; Graduation Date"
                        name="graduationDate"
                        value={graduationDate}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cProfile-submit">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createOrUpdateProfileAction: PropTypes.func.isRequired,
};

export default connect(null, { createOrUpdateProfileAction })(
  withRouter(CreateProfile)
);
