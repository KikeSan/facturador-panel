import React, { useEffect } from 'react';
import "../../assets/styles/components/Login.scss";

const Login = () => {
  useEffect((params) => {
    let isSubscribed = true;

    return () => (isSubscribed = false);
  }, []);

  return(
    <div className="login">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Usuario" id="user" type="text" className="validate" />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Contraseña" id="password" type="password" className="validate" />
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
