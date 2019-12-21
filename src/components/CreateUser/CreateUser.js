import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Config from "../Config/Config";
import "../../assets/styles/components/CreateUser.scss";

const CreateUserComponent = (props) => {

  const [dni, setDni] = useState("");

  const validateForm = () => {

    var reg = /^[0-9]{1,8}$/;
    var checking = reg.test(dni);

    return dni.length === 8 && checking;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    callApi();
  };

  const callApi = () => {

    const data = {
      "tienda": "MMF1",
      "sap": "0900000668",
      "dni": dni,
      "nombres": "TEST",
      "apellidos": "DEV",
      "estado": "1",
      "idVendedor": "X",
      "contrasena": dni
    }

    const apiUrl = Config.API_URL.CREATE_USER;
    console.log(data);
    console.log(apiUrl);

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("create user response:", response);
        if (response.status === 200) {
          alert("Usuario creado");
          // Ejecuta callback para confirmar el cambio de contraseña
          //props.confirmPasswordChange(true);
        } else {
          alert("No se puedo crear el usuario");
        }

      })
      .catch((error) => {
        console.log("crear usuario error", error);
        alert("No se puedo crear el usuario");
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
              <h1 className="change-password__userName card-title">Crear usuario vendedor</h1>
            </div>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>

              <div className="row">
                <div className="input-field col s12">
                  <input id="dni" maxLength="8" type="text" className="validate white-text" value={dni} onChange={(event) => setDni(event.target.value)} />
                  <label htmlFor="dni" className="grey-text text-lighten-2">Ingresar DNI</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <button className="waves-effect btn" disabled={!validateForm()} type="submit">Crear</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreateUserComponent;
