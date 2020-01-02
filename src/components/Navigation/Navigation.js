import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/components/Navigation.scss";
import logo from "../../assets/img/logoM.png";

const Navigation = () => {
  // const [activeClasses, setActiveClasses] = useState("");

  const changeActiveButton = event => {
    document.querySelector(".nav-wrapper .active").classList.remove("active");

    const button = event.target.parentNode;
    button.classList.add("active");
  };

  return (
    <nav className="navigation fondoAzul">
      <div className="nav-wrapper">
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/" replace>
              Código QR
            </Link>
          </li>
          <li>
            <Link to="/change-password" replace>
              Cambiar contraseña
            </Link>
          </li>
          <li>
            <Link to="/create-user" replace>
              Crear usuario
            </Link>
          </li>
        </ul>
        <div className="left">
          <img src={logo} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
