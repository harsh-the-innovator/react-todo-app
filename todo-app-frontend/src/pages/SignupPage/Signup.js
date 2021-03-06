import React from "react";

import WelcomeNavbar from "../../components/WelcomeNavbar";
import SignupFormComponent from "./components/SignupFormComponent";

const Signup = (props) => {
  return (
    <>
      <WelcomeNavbar />
      <SignupFormComponent history={props.history} />
    </>
  );
};

export default Signup;
