import { FC, useState } from 'react';
import { Form, useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Link,
  IconButton,
  Box,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { INews } from '../types/types';
import { formatDate } from '../helpers/date.helper';

const MAX_DESCRIPTION_LENGTH = 130;

const truncateContent = (value: string) => {
  if (value.length > MAX_DESCRIPTION_LENGTH) {
    return `${value.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
  }
  return value;
};

interface NewsItemProps {
  data: INews[];
}

const NewsItem: FC<NewsItemProps> = ({ data }) => {
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const location = useLocation();

  const handleDeleteConfirmation = (e: React.MouseEvent<HTMLButtonElement>, itemId: number) => {
    e.stopPropagation();
    const isConfirmed = window.confirm('Are you sure you want to delete this news?');
    if (isConfirmed) {
      setDeletingItemId(itemId);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, itemId: number) => {
    if (deletingItemId === itemId) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  };

  if (data.length === 0) {
    return (
      <Container maxWidth="md">
        <Typography textAlign={'center'} mt={2} variant="h6">
          Create your first post!
        </Typography>
      </Container>
    );
  }

  return (
    <>
      {data.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={6}>
          <RouterLink to={`/news/${item.id}`} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                position: 'relative',
                height: '250px',
                borderRadius: 2,
                boxShadow: 4,
                '&:hover': {
                  boxShadow: 12,
                  cursor: 'pointer',
                },
              }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {item.category?.title || 'Other'}
                  <br />
                  <br />
                  {truncateContent(item.description)}
                  {MAX_DESCRIPTION_LENGTH < item.description.length && (
                    <Link href="#" color="primary" underline="hover">
                      Read more
                    </Link>
                  )}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 5px 5px 15px',
                }}>
                <Typography variant="caption" color="textSecondary">
                  Date: {formatDate(item.createdAt)}
                </Typography>
                {location.pathname == '/news' && (
                  <Form
                    method="delete"
                    action="/news"
                    onSubmit={(e) => handleFormSubmit(e, item.id)}>
                    <input type="hidden" name="id" value={item.id} />
                    <IconButton
                      onClick={(e) => handleDeleteConfirmation(e, item.id)}
                      type="submit"
                      aria-label="delete"
                      sx={{ color: 'error.main' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Form>
                )}
              </Box>
            </Card>
          </RouterLink>
        </Grid>
      ))}
    </>
  );
};

export default NewsItem;
