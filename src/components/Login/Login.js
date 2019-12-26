// React and complements
import React, { useState } from 'react';
import axios from 'axios';

// Material Ui components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Personal development
import SimpleDialog from '../Dialog/SimpleDialog';
import Config from '../Config/Config';
import '../../assets/styles/components/Login.scss';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
});

const Login = (props) => {
  const classes = useStyles();

  // Datos del dialog
  const [dialog, setDialog] = React.useState({
    open: false,
    title: '',
    message: '',
  });

  // Evento para cerrar el dialog
  const handleCloseDialog = () => {
    setDialog({
      open: false,
    });
  };

  // Datos del usuario
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [store, setStore] = useState('');

  const validateForm = () => password.length > 0 && user.length > 0 && store.length > 2;

  const callApi = () => {
    // Recoge los datos de los estados
    const userData = {
      dni: user,
      contrasena: password,
      tienda: store,
    };

    const apiUrl = Config.API_URL.LOGIN;

    axios
      .post(apiUrl, userData)
      .then((response) => {
        console.log('login success =>', response);

        // Valida que se haya logueado correctamente
        if (response.status === 200) {
          // Cambia el flag que indica si el usuario está autenticado o no
          props.changeAuthorizedValue(true);

          // Envia el userId (DNI) del usuario logueado
          const { dni } = response.data;
          const { nombres } = response.data;
          const { apellidos } = response.data;
          props.changeUserData({ dni, nombres, apellidos });
        }
      })
      .catch((error) => {
        // Mensaje por defecto para errores 500
        const dialogData = {
          open: true,
          title: 'Error de inicio de sesión',
          message: 'Ocurrió un error interno, verifique su conexión a internet o comuníquese con soporte.',
        };

        // Errores con status identificados
        if (error.response) {
          switch (error.response.status) {
            case 401:
              dialogData.message = 'No se puede iniciar sesión con los datos proporcionados.';
              break;

            default:
              dialogData.message = 'Ocurrió un error interno, verifique su conexión a internet o comuníquese con soporte.';
              break;
          }
        }
        setDialog(dialogData);
        console.log('login error =>', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callApi();
  };

  return (
    <div className="login">
      <SimpleDialog open={dialog.open} title={dialog.title} message={dialog.message} onClose={handleCloseDialog} />

      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField id="user" label="Usuario" value={user} onChange={(event) => setUser(event.target.value)} variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField id="tienda" label="Código de tienda" value={store} onChange={(event) => setStore(event.target.value)} variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField id="pasword" label="Contraseña" type="password" value={password} onChange={(event) => setPassword(event.target.value)} variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button disabled={!validateForm()} type="submit" variant="contained" color="secondary">Ingresar</Button>
              </Grid>
            </Grid>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
