import React, { useState } from 'react';
import axios from 'axios';

// Material Ui components
import {
  Button, Card, CardContent, CardHeader, Avatar, Grid, TextField,
} from '@material-ui/core';

import Config from '../Config/Config';
import '../../assets/styles/components/ChangePassword.scss';

const ChangePasswordComponent = (props) => {
  const { dni, nombres, apellidos } = props.userData;

  const [newPasswordState, setNewPasswordState] = useState('');

  const validateForm = () => newPasswordState.length > 0;

  const authenticate = () => {
    const apiUrl = Config.API_URL.UPDATE_PASSWORD;

    axios
      .put(apiUrl, {
        dni,
        contrasena: newPasswordState,
      })
      .then((response) => {
        console.log('change pasword response:', response);
        if (response.status === 200) {
          console.log('cambio de contraseña exitoso');
        }
      })
      .catch((error) => {
        console.log('error al actualizar contraseña', error);
      });
  };

  const getAvatarLetters = () => nombres.slice(0, 1) + apellidos.slice(0, 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticate();
  };

  return (
    <div className="change-password">
      <Card>
        <CardHeader
          avatar={(<Avatar aria-label="recipe" className="">{getAvatarLetters()}</Avatar>)}
          title={`${nombres} ${apellidos}`}
          subheader={`Dni: ${dni}`}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField id="new_password" label="Actualizar contraseña" type="password" value={newPasswordState} onChange={(event) => setNewPasswordState(event.target.value)} variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" disabled={!validateForm()} color="secondary">Confirmar</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordComponent;
