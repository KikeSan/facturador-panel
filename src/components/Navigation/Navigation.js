import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/styles/components/Navigation.scss";
const Navigation = () => {

  // const [activeClasses, setActiveClasses] = useState("");

  const changeActiveButton = (event) => {
    document.querySelector(".nav-wrapper .active").classList.remove("active");

    const button = event.target.parentNode;
    button.classList.add("active");
  }

  return (
    <nav className="navigation">
      <div className="nav-wrapper blue-grey darken-2">
        <ul id="nav-mobile" className="left">
          <li>
            <Link to="/" replace >Código QR</Link>
          </li>
          <li>
            <Link to="/change-password" replace>Cambiar contraseña</Link>
          </li>
          <li>
            <Link to="/create-user" replace>Crear usuario</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
