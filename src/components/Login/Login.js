// React and complements
import React, { useState } from 'react';
import axios from 'axios';

// Material Ui components
import {
  makeStyles, Button, Card, CardContent, Grid, TextField,
} from '@material-ui/core';

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
  // Estados para guardar la información del usuario autenticado
  const [userDataState, setUserDataState] = React.useState({});

  // Estados para el control del renderizado
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Clases a aplicar a los componentes de Material-UI
  const classes = useStyles();

  // Estados para el control de información del modal de diálogo
  const [dialogState, setDialogState] = React.useState({
    open: false,
    title: '',
    message: '',
  });

  // Controlador de cierre del modal de diálogo
  const handleCloseDialog = () => {
    setDialogState({
      open: false,
    });
  };

  // Valores ingresados en el formulario
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [store, setStore] = useState('');

  const validateForm = () => password.length > 0 && user.length > 0 && store.length > 2;

  const showErrorMessage = (info) => {
    const title = info.title || 'Error de inicio de sesión';
    const dialogData = {
      open: true,
      title,
      message: info.message,
    };
    setDialogState(dialogData);
  };

  // Renderiza el componente una vez autenticado
  const childRender = () => props.render(userDataState);

  const callApi = () => {
    const apiUrl = Config.API_URL.LOGIN;

    axios
      .post(apiUrl, {
        dni: user,
        contrasena: password,
        tienda: store,
      })
      .then((response) => {
        // Valida que se haya logueado correctamente
        if (response.status === 200) {
          setUserDataState(response.data);
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        let message = 'Ocurrió un error interno, verifique su conexión a internet o comuníquese con soporte.';

        // Errores con status identificados
        if (error.response) {
          if (error.response.status === 401) message = 'No se puede iniciar sesión con los datos proporcionados.';
        }

        showErrorMessage({ message });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callApi();
  };

  return (
    <div>
      {isAuthenticated === true ? childRender() : (
        <div className="login">
          <SimpleDialog open={dialogState.open} title={dialogState.title} message={dialogState.message} onClose={handleCloseDialog} />

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
      )}
    </div>
  );
};

export default Login;
