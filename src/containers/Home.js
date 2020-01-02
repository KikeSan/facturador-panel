import React from "react";
import Navigation from "../components/Navigation/Navigation";
import QRCard from "../components/QRCard/QRCard";
import Credits from "../components/Credits/Credits";

const Home = () => (
  <div className="MainWrapper">
    <Navigation />
    <QRCard />
    <Credits />
  </div>
);

export default Home;
