import React, { useState } from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import "../../assets/styles/components/Navigation.scss";
import logo from "../../assets/img/logoM.png";

const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);

    setValue(newValue);
  };

  return (
    <div className="navigation">
      <AppBar position="static" className="fondoAzul">
        <div className="left">
          <img src={logo} />
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Código QR" to="/qr-code" replace component={Link} />
          <Tab
            label="Cambiar contraseña"
            to="/change-password"
            replace
            component={Link}
          />
          <Tab
            label="Crear Usuario"
            to="/create-user"
            replace
            component={Link}
          />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default Navigation;
