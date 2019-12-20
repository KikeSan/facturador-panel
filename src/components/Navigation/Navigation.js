import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/styles/components/Navigation.scss";
const Navigation = () => (
  <nav className="navigation">
    <div className="nav-wrapper blue-grey">
      <ul id="nav-mobile" className="left">
        <li><Link to="/" replace>Código QR</Link></li>
        <li><Link to="/change-password" replace>Cambiar contraseña</Link></li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
