import React from 'react';
import Avatar from "@mui/material/Avatar";
import { Button, TextField, Link, Grid, CssBaseline, Typography, Container, useTheme} from '@mui/material';
import { ThemeContext } from '@emotion/react';
import LockOutlinedIcon  from '@mui/icons-material/LockOutlined';
import { useAuth } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import {Box} from '@mui/material';




export default function Login() {
  const theme=useTheme();
  const navigate =useNavigate();
  const {signIn} = useAuth();
  async function login(event){
    event.preventDefault();
    const {email,password}=event.target;
    await signIn(email.value, password.value);
    navigate("/");
  }
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        mt:theme.spacing(8),
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
      }}
      >
        <Avatar sx={{
          m:1,
          backgroundColor: theme.palette.secondary.main,
          
        }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>
        <form onSubmit={login}
        sx={{
          maxWidth:"100%",
          mt:1,
        }}
        >
          <TextField 
          label="email"
          variant="outlined" 
          margin="normal" 
          required
          fullWidth 
          id="email" 
          name="email" 
          type="email"
          autoFocus 
          autoComplete='off'
          ></TextField>
          <TextField 
          label="password"
          variant="outlined" 
          margin="normal" 
          required
          fullWidth 
          id="password" 
          name="password" 
          type="password"
          autoComplete='current-password'
          ></TextField>
          <Button type="submit" variant="contained" fullWidth color="primary" sx={{
            margin:theme.spacing(3,0,2)
          }}>Sign In </Button>
          <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link href="/register">Don't have Account? Sign Up</Link>
          </Grid>
        </Grid>
        </form>
      </Box>
    </Container>
  );
}
