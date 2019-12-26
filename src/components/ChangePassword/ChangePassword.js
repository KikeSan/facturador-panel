import axios from 'axios';
import React, { useState } from 'react';

// Material Ui components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Config from '../Config/Config';
import '../../assets/styles/components/ChangePassword.scss';

const ChangePasswordComponent = (props) => {
  const { dni, nombres, apellidos } = props.userData;
  const [newPassword, setNewPassword] = useState('');

  const validateForm = () => newPassword.length > 0;

  const authenticate = () => {
    const data = {
      dni,
      contrasena: newPassword,
    };

    const apiUrl = Config.API_URL.UPDATE_PASSWORD;

    axios
      .put(apiUrl, data)
      .then((response) => {
        // throw new Error('Whoops!');

        console.log('change pasword response:', response);
        if (response.status === 200) {
          // Ejecuta callback para confirmar el cambio de contraseña
          props.confirmPasswordChange(true);
        } else {
          console.log('Algo salió mal');
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
                <TextField id="new_password" label="Actualizar contraseña" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} variant="outlined" fullWidth />
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
