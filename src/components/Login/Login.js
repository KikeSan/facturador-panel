import axios from "axios";
import React, { useState, useEffect } from "react";
import Config from "../Config/Config";
import "../../assets/styles/components/Login.scss";

const Login = props => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [store, setStore] = useState("");

  const validateForm = () => {
    return password.length > 0 && user.length > 0 && store.length > 2;
  };

  const handleSubmit = event => {
    event.preventDefault();
    authenticate();
  };

  const authenticate = () => {
    const userData = {
      dni: user,
      contrasena: password,
      tienda: store
    };

    console.log(userData);
    const apiUrl = Config.API_URL.LOGIN;
    console.log(apiUrl);

    axios
      .post(apiUrl, userData)
      .then(response => {
        console.log("login >", response);

        // Valida que se haya logueado correctamente
        if (response.status === 200) {
          // Cambia el flag que indica si el usuario está autenticado o no
          props.changeAuthorizedValue(true);

          // Envia el userId (DNI) del usuario logueado
          const dni = response.data.dni;
          const nombres = response.data.nombres;
          const apellidos = response.data.apellidos;
          props.changeUserData({ dni, nombres, apellidos });
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  useEffect(params => {
    let isSubscribed = true;

    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="login">
      <div className="card fondoBlanco">
        <div className="tituloPage fondoAzul textoBlanco">
          <i className="material-icons tituloPage__icon">verified_user</i>
          <span className="tituloPage__texto">Autenticación de usuario</span>
        </div>
        <div className="card-content white-text">
          <div className="row mb0">
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    placeholder="Usuario"
                    id="user"
                    type="text"
                    className="validate textoGris"
                    value={user}
                    onChange={event => setUser(event.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    placeholder="Código de tienda"
                    id="tienda"
                    type="text"
                    className="validate textoGris"
                    value={store}
                    onChange={event => setStore(event.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    placeholder="Contraseña"
                    id="password"
                    type="password"
                    className="validate textoGris"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                </div>
              </div>

              <div className="row mb0">
                <div className="input-field col s12">
                  <button
                    className="waves-effect btn right"
                    disabled={!validateForm()}
                    type="submit"
                  >
                    Ingresar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
