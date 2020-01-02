import axios from "axios";
import React, { useState, useEffect } from "react";

// Material Ui components
import {
  makeStyles,
  Button,
  Card,
  CardContent,
  Grid,
  TextField
} from "@material-ui/core";

import SimpleDialog from "../Dialog/SimpleDialog";
import Config from "../Config/Config";
import "../../assets/styles/components/CreateUser.scss";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  }
});

const CreateUserComponent = props => {
  // Información del modal
  const [modalInformation, setModalInformation] = useState({
    classes: "",
    message: ""
  });

  // Clases a aplicar a los componentes de Material-UI
  const classes = useStyles();

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

  // Estados para el control de información del modal de diálogo
  const [dialogState, setDialogState] = React.useState({
    open: false,
    message: ""
  });
  const showModalMessage = info => {
    const dialogData = {
      open: true,
      message: info
    };
    setDialogState(dialogData);
  };
  const handleCloseDialog = () => {
    setDialogState({
      open: false
    });
    setNombres("");
    setApellidos("");
    setCodTienda("");
    setDni("");
    setSapId("");
  };

  // Valida el ingreso de números
  const isNumeric = number => {
    const regex = /^[0-9\b]+$/;
    if (number === "" || regex.test(number)) {
      return true;
    }
    return false;
  };

  const validateForm = () => {
    /**
     * Validación de nombres y apellidos
     */
    const nombresApellidosExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/;
    const nombresValidation =
      nombresApellidosExp.test(nombres) && nombres.length > 3;
    const apellidosValidation =
      nombresApellidosExp.test(apellidos) && apellidos.length > 3;

    /**
     * Validación de DNI
     * Sólo números de 8 dígitos
     */
    const dniValidation = isNumeric(dni) && dni.length === 8;

    /**
     * Validación de código de tienda
     * Sólo números, letras, sin espacios y 4 caracteres
     */
    const codTiendaExp = /^[0-9a-zA-Z]+$/;
    const codTiendaValidation =
      codTiendaExp.test(codTienda) && codTienda.length === 4;

    // Validación de código SAP
    // Sólo números desde el 0 al 9 de diez dígitos
    const codSapValidation = isNumeric(sapId) && sapId.length === 10;

    console.log(
      "nombres: ",
      nombresValidation,
      " / apellidos: ",
      apellidosValidation,
      "/ dni: ",
      dniValidation,
      " / codTienda: ",
      codTiendaValidation,
      " / sap Id: ",
      codSapValidation
    );

    const isValid = !!(
      nombresValidation &&
      apellidosValidation &&
      dniValidation &&
      codTiendaValidation &&
      codSapValidation
    );
    return isValid;
  };

  const handleSubmit = event => {
    event.preventDefault();
    callApi();
  };

  /**
   * Muestra el mensaje de respuesta del Api
   * @param {*} params
   */
  const showApiMessage = _message => {
    setModalInformation({
      classes: "is-visible",
      message: _message
    });
  };

  const callApi = () => {
    const data = {
      tienda: codTienda,
      sap: sapId,
      dni,
      nombres,
      apellidos,
      estado: "1",
      idVendedor: "X",
      contrasena: dni
    };

    const apiUrl = Config.API_URL.CREATE_USER;

    axios
      .post(apiUrl, data)
      .then(response => {
        console.log("create user response:", response);
        if (response.status === 200) {
          showApiMessage("Usuario creado correctamente");
          showModalMessage("Usuario creado correctamente");
        } else {
          showApiMessage("Ocurrió un error");
        }
      })
      .catch(error => {
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

  useEffect(params => {
    let isSubscribed = true;
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="create-user">
      {/* Modal de confirmación */}
      {/* <div id="apiModalMessage" className={`modal ${modalInformation.classes}`}>
        <div className="modal-content">
          <p className="center-align">{modalInformation.message}</p>
        </div>
        <div className="modal-footer">
          <button
            className="waves-effect btn"
            onClick={() => setModalInformation({ classes: "" })}
          >
            {" "}
            OK{" "}
          </button>
        </div>
      </div> */}
      <SimpleDialog
        open={dialogState.open}
        /* title={dialogState.title} */
        message={dialogState.message}
        onClose={handleCloseDialog}
      />

      {/* Formulario de creación de usuarios */}
      {/* <div className="card blue-grey darken-2">
        <div className="card-content white-text">
          <div className="row">
            <div className="col s12">
              <h1 className="change-password__userName card-title">
                Datos de vendedor
              </h1>
            </div>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="nombres"
                    maxLength="50"
                    type="text"
                    className="validate white-text"
                    value={nombres}
                    onChange={event => setNombres(event.target.value)}
                  />
                  <label htmlFor="nombres" className="grey-text text-lighten-3">
                    {" "}
                    Nombres{" "}
                  </label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="apellidos"
                    maxLength="50"
                    type="text"
                    className="validate white-text"
                    value={apellidos}
                    onChange={event => setApellidos(event.target.value)}
                  />
                  <label
                    htmlFor="apellidos"
                    className="grey-text text-lighten-3"
                  >
                    {" "}
                    Apellidos{" "}
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="dni"
                    maxLength="8"
                    type="text"
                    className="validate white-text"
                    value={dni}
                    onChange={event => {
                      if (isNumeric(event.target.value)) {
                        setDni(event.target.value);
                      }
                    }}
                  />
                  <label htmlFor="dni" className="grey-text text-lighten-3">
                    {" "}
                    Número de DNI{" "}
                  </label>

                </div>
                <div className="input-field col s6">
                  <input
                    id="cod_tienda"
                    maxLength="4"
                    type="text"
                    className="validate white-text"
                    value={codTienda}
                    onChange={event => {
                      setCodTienda(event.target.value.toUpperCase());
                    }}
                  />
                  <label
                    htmlFor="cod_tienda"
                    className="grey-text text-lighten-3"
                  >
                    {" "}
                    Código de tienda{" "}
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="sap_id"
                    maxLength="10"
                    type="text"
                    className="validate white-text"
                    value={sapId}
                    onChange={event => {
                      if (isNumeric(event.target.value)) {
                        setSapId(event.target.value);
                      }
                    }}
                  />

                  <label htmlFor="sap_id" className="grey-text text-lighten-3">
                    {" "}
                    Código SAP{" "}
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <button
                    className="waves-effect btn"
                    disabled={!validateForm()}
                    type="submit"
                  >
                    Crear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}

      <Card className={classes.card}>
        <CardContent>
          <form className="col s12" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="nombres"
                  label="Nombres"
                  value={nombres}
                  maxLength="50"
                  onChange={event => setNombres(event.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="apellidos"
                  label="Apellidos"
                  value={apellidos}
                  maxLength="50"
                  onChange={event => setApellidos(event.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="dni"
                  label="Número de DNI"
                  value={dni}
                  maxLength="50"
                  onChange={event => {
                    if (isNumeric(event.target.value)) {
                      setDni(event.target.value);
                    }
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="cod_tienda"
                  label="Código de tienda"
                  value={codTienda}
                  maxLength="50"
                  onChange={event => {
                    setCodTienda(event.target.value.toUpperCase());
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="sap_id"
                  label="Código SAP"
                  value={sapId}
                  maxLength="50"
                  onChange={event => {
                    if (isNumeric(event.target.value)) {
                      setSapId(event.target.value);
                    }
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!validateForm()}
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Crear usuario
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserComponent;
