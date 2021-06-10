import { Fragment } from "react";
import spinner from "../../images/spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{
          width: "150px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        alt="Loading GIF"
      />
    </Fragment>
  );
};

export default Spinner;
