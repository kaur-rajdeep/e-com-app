import React from 'react';
import { Avatar, Button, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "@mui/material/Link";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../firebase/auth";

export default function Register() {
  const {signUp} =useAuth();
  const navigate= useNavigate();
  async function registerUser(event){
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    await signUp(data.get("email"), data.get("password"), data.get("name"));
    navigate("/login");

  }
  return (
    <Container component={"main"} mainwidth="xs">
      <CssBaseline />
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{
          m: 1,
          bgcolor: "secondary.main",
        }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">SignUp</Typography>
        <Box component={"form"} sx={{ mt: 3 }} onSubmit={registerUser}>
          <Grid container spacing={2} >
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                fullWidth
                required
                name="name"
                id="name"
                autoFocus
                label="Name"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                type="email"
                fullWidth
                required
                name="email"
                id="email"
                label="Email"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                type="password"
                fullWidth
                required
                name="password"
                id="password"
                label="Password"
              ></TextField>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:2}}
          >Register</Button>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link href="/login">Already have Account? Sign In</Link>
          </Grid>
        </Grid>
        </Box>
      </Box>
    </Container>
  )
}
