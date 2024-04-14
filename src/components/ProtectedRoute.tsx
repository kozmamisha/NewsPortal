import { FC } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Box, Container, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();
  return (
    <>
      {isAuth ? (
        children
      ) : (
        <Container maxWidth="md">
          <Box display="flex" flexDirection="column" alignItems="center" mt={8} p={4}>
            <Typography variant="h4" align="center" gutterBottom>
              This page is protected
            </Typography>
            <Typography variant="body1" align="center" mb={6}>
              You need to be logged in to access this page. Please log in or sign up.
            </Typography>
            <SecurityIcon sx={{ fontSize: 200, opacity: 0.8 }} />
          </Box>
        </Container>
      )}
    </>
  );
};
