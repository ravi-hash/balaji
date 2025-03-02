import React from "react";
import { Link } from "react-router-dom";
import "./Error.scss";
import logo from "../../assets/logo/logoo.png";

const ErrorPage = () => {
  return (
    <div className="error">
      <Link to="/" className="error__logo">
        <img
          src={logo}
          alt="logo"
          width={"auto"}
          height={"100px"}
          style={{ marginTop: "20px" }}
        />
      </Link>
      <h2 className="error__title">Looking for something?</h2>
      <p className="error__para">
        We're sorry. The Web page you entered we are still working on it.
        <div style={{ fontSize: '80px' }}>
  {String.fromCodePoint('0x1f603')}
</div>

        We are sorry for it.
      </p>
      <h2 className="error__guide">
        ▶ Go to Balaji <Link to="/">Home</Link> Page
      </h2>
    </div>
  );
};

export default ErrorPage;
