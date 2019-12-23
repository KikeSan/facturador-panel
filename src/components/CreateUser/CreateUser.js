import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Config from "../Config/Config";
import "../../assets/styles/components/CreateUser.scss";

const CreateUserComponent = (props) => {

  // Información del modal
  const [modalInformation, setModalInformation] = useState({
    classes: "",
    message: ""
  });

  // Nombres
  const [nombres, setNombres] = useState("");

  // Apellidos
  const [apellidos, setApellidos] = useState("");

  // Número de documento
  const [dni, setDni] = useState("");

  // Código de tienda
  const [codTienda, setCodTienda] = useState("");

  // Código de tienda
  const [sapId, setSapId] = useState("");

  const validateForm = () => {

    /**
     * Validación de nombres y apellidos
     */
    const nombresApellidosExp = /^[0-9a-zA-Z]+$/;
    const nombresValidation = nombresApellidosExp.test(nombres) && nombres.length > 3;
    const apellidosValidation = nombresApellidosExp.test(apellidos) && apellidos.length > 3;

    /**
     * Validación de DNI
     * Sólo números de 8 dígitos
     */
    const dniExp = /^[0-9]{8}$/;
    const dniValidation = dniExp.test(dni);

    /**
     * Validación de código de tienda
     * Sólo números, letras, sin espacios y 4 caracteres
     */
    const codTiendaExp = /^[0-9a-zA-Z]+$/;
    const codTiendaValidation = codTiendaExp.test(codTienda) && codTienda.length === 4;


    // Validación de código SAP
    // Sólo números desde el 0 al 9 de diez dígitos
    const codSapExp = /^[0-9]{10}$/;
    const codSapValidation = codSapExp.test(sapId);

    const isValid = (nombresValidation && apellidosValidation && dniValidation && codTiendaValidation && codSapValidation)? true:false;
    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    callApi();
  };

  /**
   * Muestra el mensaje de respuesta del Api
   * @param {*} params
   */
  const showApiMessage = (_message) => {
    setModalInformation({
      classes: "is-visible",
      message: _message
    });
  };

  const callApi = () => {

    const data = {
      "tienda": codTienda,
      "sap": sapId,
      "dni": dni,
      "nombres": nombres,
      "apellidos": apellidos,
      "estado": "1",
      "idVendedor": "X",
      "contrasena": dni
    }

    const apiUrl = Config.API_URL.CREATE_USER;

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("create user response:", response);
        if (response.status === 200) {
          showApiMessage("Usuario creado correctamente");
        } else {
          showApiMessage("Ocurrió un error");
        }

      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        if (error.response) {
          // console.log("response", error.response);

          switch (error.response.status) {
            case 409:
              showApiMessage("Ya existe un usuario con el mismo DNI.");
              break;
            default:
              showApiMessage("Ocurrió un error al crear el usario.");
              break;
          }

          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else {
          console.log("mostrar este otro mensaje");

          showApiMessage("Ocurrió un error al crear el usario.");
        }
      });
  };

  useEffect((params) => {
    let isSubscribed = true;
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="create-user">

      {/* Modal de confirmación */}
      <div id="apiModalMessage" className={"modal " + modalInformation.classes}>
        <div className="modal-content">
          <p className="center-align">{modalInformation.message}</p>
        </div>
        <div className="modal-footer">
          <button className="waves-effect btn" onClick={() => setModalInformation({classes:""})}>OK</button>
        </div>
      </div>

      {/* Formulario de creación de usuarios */}
      <div className="card blue-grey darken-2">
        <div className="card-content white-text">

          <div className="row">
            <div className="col s12">
              <h1 className="change-password__userName card-title">Datos de vendedor</h1>
            </div>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>

              {/* Nombres y apellidos */}
              <div className="row">
                <div className="input-field col s6">
                  <input id="nombres" maxLength="50" type="text" className="validate white-text" value={nombres} onChange={(event) => setNombres(event.target.value)} />
                  <label htmlFor="nombres" className="grey-text text-lighten-3">Nombres</label>
                </div>
                <div className="input-field col s6">
                  <input id="apellidos" maxLength="50" type="text" className="validate white-text" value={apellidos} onChange={(event) => setApellidos(event.target.value)} />
                  <label htmlFor="apellidos" className="grey-text text-lighten-3">Apellidos</label>
                </div>
              </div>

              <div className="row">
                {/* Número de DNI */}
                <div className="input-field col s6">
                  <input id="dni" maxLength="8" type="text" className="validate white-text" value={dni} onChange={(event) => setDni(event.target.value)} />
                  <label htmlFor="dni" className="grey-text text-lighten-3">Número de DNI</label>
                  {/* <span className="helper-text grey-text text-lighten-1" data-error="wrong" data-success="right">Ingrese 8 dígitos</span> */}
                </div>
                {/* Código de tienda */}
                <div className="input-field col s6">
                  <input id="cod_tienda" maxLength="4" type="text" className="validate white-text" value={codTienda} onChange={(event) => setCodTienda(event.target.value)} />
                  <label htmlFor="cod_tienda" className="grey-text text-lighten-3">Código de tienda</label>
                </div>
              </div>

              {/* SAP Id */}
              <div className="row">
                <div className="input-field col s6">
                  <input id="sap_id" maxLength="10" type="text" className="validate white-text" value={sapId} onChange={(event) => setSapId(event.target.value)} />
                  <label htmlFor="sap_id" className="grey-text text-lighten-3">Código SAP</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
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
