import React from "react";
import Navigation from "../components/Navigation/Navigation";
import CreateUserComponent from "../components/CreateUser/CreateUser";

const CreateUser = () => (
  <div className="MainWrapper">
    <Navigation />
    <CreateUserComponent />
  </div>
);

export default CreateUser;
