import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: '',
  password: '',
  displayName: ''
}
const formValidations = {
  email: [(value) => value.includes("@"), "El email debe tener un arroba"],
  password: [
    (value) => value.length >= 6,
    "El password debe tener más de 6 letas",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])
  

  const dispatch = useDispatch();

  const [formSubmitted, setformSubmitted] = useState(false);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValidate,
    displayNameValied,
    emailValied,
    passwordValied,
  } = useForm( formData, formValidations );


  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);
    if (!isFormValidate) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };
  return (
    <AuthLayout title="Registarse">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type={"text"}
              placeholder="Tu nombre"
              fullWidth
              name="displayName"
              autoComplete="off"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValied && formSubmitted}
              helperText={displayNameValied}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type={"email"}
              placeholder="correo@goggle.com"
              fullWidth
              name="email"
              autoComplete="off"
              value={email}
              onChange={onInputChange}
              error={!!emailValied && formSubmitted}
              helperText={emailValied}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type={"password"}
              placeholder="Tu contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValied && formSubmitted}
              helperText={passwordValied}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12} display={ !!errorMessage ? '' : 'none'}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" type="submit" fullWidth disabled={ isCheckingAuthentication}>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
