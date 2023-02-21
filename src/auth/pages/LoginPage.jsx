import { useDispatch, useSelector } from "react-redux";

import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Google, Password } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startGoogleSingIn,startLoginWithEmailPassword } from "../../store/auth/thunks";

const formData  ={
    email:'',
    password: ''
  
}

export const LoginPage = () => {
  
  const { status, errorMessage } = useSelector(state => state.auth)
  
  const dispatch = useDispatch();
  
  const { email, password, onInputChange} = useForm(formData)

  const isAutenticating = useMemo(() => status === 'checking', [status])
   
  const onSubmit = ( event )=>{
    event.preventDefault()
    console.log(email,password)
    dispatch(startLoginWithEmailPassword({email, password}))
  }
  
  const onGoogleSignIn =  ()  =>{
    console.log('OnGoogleSignIn')
    dispatch(startGoogleSingIn())
  }

  return (
    <AuthLayout title="Login"> 
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster"   >
        <Grid container>
          <Grid item xs = {12} sx = {{ mt: 2 }}>
            <TextField
              label="Correo"
              type={"email"}
              placeholder="correo@google.com"
              fullWidth
              name = {'email'}
              value = {email}
              onChange = {onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type={"password"}
              placeholder="Tu contraseña"
              fullWidth
              name = {'password'}
              value = {password}
              onChange = {onInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={12} display={ !!errorMessage ? '' : 'none'} sx={{mt:2}}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit"
               disabled={ isAutenticating}  
               variant="contained"
               fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
               onClick={ onGoogleSignIn }
               disabled={ isAutenticating}
               variant="contained" 
               fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
              
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
