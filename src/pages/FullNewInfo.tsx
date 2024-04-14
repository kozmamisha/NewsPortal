import { FC, useEffect, useState } from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { formatDate } from '../helpers/date.helper';
import { INews } from '../types/types';
import { instance } from '../api/axios.api';
import NotFoundPage from './ErrorPage';

const fullNewLoader = async (id: number) => {
  const fullNewInfo = await instance.get(`/news/news/${id}`);
  return fullNewInfo.data as INews[];
};

const FullNewInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fullNewInfo, setFullNewInfo] = useState<INews[] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fullNewLoader(parseInt(id || '', 10));
        setFullNewInfo(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate(<NotFoundPage />);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" mt={6} textAlign={'center'}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (!fullNewInfo) {
    return <Navigate to={<NotFoundPage />} />;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid #ccc',
        marginTop: '20px',
        marginBottom: '40px',
        padding: '20px',
      }}>
      <Typography variant="h4" gutterBottom>
        {fullNewInfo.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Category: {fullNewInfo.category?.title || 'Other'}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginBottom: '10px' }}>
        {fullNewInfo.description}
      </Typography>
      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '10px' }}>
        Date: {formatDate(fullNewInfo.createdAt)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        style={{ display: 'block', marginTop: '25px' }}>
        Return to Home
      </Button>
    </Container>
  );
};

export default FullNewInfo;
