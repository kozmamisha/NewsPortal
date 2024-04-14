import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const NotFoundPage: FC = () => {
  return (
    <Box sx={{textAlign: 'center', mt: 16}}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home Page
      </Button>
    </Box>
  );
};

export default NotFoundPage;
