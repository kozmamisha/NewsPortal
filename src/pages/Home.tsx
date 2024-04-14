import { Box, Container, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { IResponseNewsLoader } from '../types/types';
import NewsItem from '../components/NewsItem';

const Home: FC = () => {
  const { news } = useLoaderData() as IResponseNewsLoader;

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Home Page
        </Typography>
        <Grid container spacing={2} mb={10}>
          <NewsItem data={news} />
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
