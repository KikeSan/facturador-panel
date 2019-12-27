import React, { useState } from 'react';
import ChangePasswordComponent from '../components/ChangePassword/ChangePassword';

const ChangePassword = () => {
  console.log('changePassword');

  // Confirmación de contraseña actualizada
  const [passwordChanged, setpasswordChanged] = useState(false);

  // Datos del usuario
  const [userData, setUserData] = useState({
    dni: '44808124',
    nombres: 'Juan',
    apellidos: 'Cahuana',
  });

  // Estado que indica si el usuario está autenticado o no
  const [authorizedUser, setAuthorizedUser] = useState(false);

  return (
    <div className="MainWrapper">
      <ChangePasswordComponent userData={userData} confirmPasswordChange={(_value) => setpasswordChanged(_value)} />
    </div>
  );
};


export default ChangePassword;
