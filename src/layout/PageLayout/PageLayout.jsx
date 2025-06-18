import React from "react";
import "./PageLayout.css";
import NavBar from "../../library/components/NavBar/NavBar";
import Footer from "../../library/components/Footer/Footer";

const PageLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="pageLayoutContainer">
        <div className="childContainer">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
