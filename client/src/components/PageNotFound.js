import { Fragment } from "react";
import error404 from "../images/error404.gif";
import alertify from "alertifyjs";

const PageNotFound = () => {
  alertify.notify("Page Not Found", "error", 3);
  return (
    <Fragment>
      <div className="home">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <img src={error404} alt="Page Not Found" style={{ width: "50%" }} />
        </h1>
      </div>
    </Fragment>
  );
};

export default PageNotFound;
