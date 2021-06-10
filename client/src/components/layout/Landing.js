import { useMediaQuery } from "react-responsive";

import landingDesktop from "../../images/landingDesktop.svg";
import landingMobile from "../../images/landingMobile.svg";
const Landing = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div className="container">
            <h1 className="x-large">Sharingo</h1>
            <p className="lead">
              <i className="far fa-images"></i> Share life experiences with
              photos
            </p>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-9">
                <div className="landing-inner-image">
                  {!isMobile ? (
                    <img src={landingDesktop} alt="Landing Desktop" />
                  ) : (
                    <img src={landingMobile} alt="Landing Mobile" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
