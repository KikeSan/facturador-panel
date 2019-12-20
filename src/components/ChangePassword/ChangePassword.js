import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Config from "../Config/Config";
import "../../assets/styles/components/ChangePassword.scss";

const ChangePasswordComponent = (props) => {

  const userData = props.userData;
  const [newPassword, setNewPassword] = useState("");

  const validateForm = () => {
    return newPassword.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticate();
  };

  const authenticate = () => {

    const data = {
      "dni": userData.dni,
      "contrasena": newPassword
    };

    const apiUrl = Config.API_URL.UPDATE_PASSWORD;
    console.log(data);
    console.log(apiUrl);


    axios
      .put(apiUrl, data)
      .then((response) => {
        console.log("change pasword response:", response);
        if (response.status === 200) {
          // Ejecuta callback para confirmar el cambio de contraseña
          props.confirmPasswordChange(true);
        } else {
          console.log("Algo salió mal");
        }

      })
      .catch((error) => {
        console.log("error al actualizar contraseña", error);
      });
  };

  useEffect((params) => {
    let isSubscribed = true;

    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="change-password">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">

          <div className="row">
            <div className="col s12">
              <h1 className="change-password__userName card-title"> <i className="material-icons small">person</i>{userData.nombres} {userData.apellidos} </h1>
            </div>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>



              <div className="row">
                <div className="input-field col s12">
                  <input id="new_password" type="password" className="validate white-text" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                  <label htmlFor="new_password" className="grey-text text-lighten-2">Actualizar contraseña</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <button className="waves-effect btn" disabled={!validateForm()} type="submit">Confirmar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChangePasswordComponent;
