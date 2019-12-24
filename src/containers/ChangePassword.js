import React, { useState } from 'react';
import NavigationComponent from '../components/Navigation/Navigation';
import LoginComponent from '../components/Login/Login';
import ChangePasswordComponent from '../components/ChangePassword/ChangePassword';

const ChangePassword = () => {

  // Confirmación de contraseña actualizada
  const [passwordChanged, setpasswordChanged] = useState(false);

  // Datos del usuario
  const [userData, setUserData] = useState({
    dni: null,
    nombres: null,
    apellidos: null
  });

  // Estado que indica si el usuario está autenticado o no
  const [authorizedUser, setAuthorizedUser] = useState(false);


  return (
    <div className="MainWrapper">

      <NavigationComponent />

      {/* Valida que exista un dni de usuario logueado */}
      {userData.dni !== null && passwordChanged === false ? <ChangePasswordComponent userData={userData} confirmPasswordChange={(_value) => {
        console.log("change", _value);

        setpasswordChanged(_value);
      }}/> : null}

      {!authorizedUser || passwordChanged === true ? <LoginComponent changeUserData={(_userData) => setUserData(_userData)} changeAuthorizedValue={(_newValue) => setAuthorizedUser(_newValue)} /> : null}

    </div>
  )

};


export default ChangePassword;
