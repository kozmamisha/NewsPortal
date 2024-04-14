import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, TextField, Typography, Container, Box, Grid } from '@mui/material';

import { AuthService } from '../services/auth.service';
import { SetTokenToLocalStorage } from '../helpers/localstorage.helper';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/user/userSlice';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({ email, password });
      if (data) {
        toast.success('Account has been created!');
        setIsLogin(!isLogin);
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({ email, password });

      if (data) {
        SetTokenToLocalStorage('token', data.token);
        dispatch(login(data));
        toast.success('You logged in!');
        navigate('/');
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography sx={{ mt: 12, mb: 4 }} variant="h4" align="center" gutterBottom>
        {isLogin ? 'Log In' : 'Sign Up'}
      </Typography>
      <form className="form" onSubmit={isLogin ? loginHandler : registrationHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              autoFocus={isLogin}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body1">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <Button onClick={toggleForm} color="primary">
            {isLogin ? 'Sign Up' : 'Log In'}
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthForm;
