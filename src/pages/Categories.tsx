import { FC, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

import { instance } from '../api/axios.api';
import CategoryModal from '../components/CategoryModal';
import { ICategory } from '../types/types';

export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const title = {
        title: formData.get('title'),
      };
      await instance.post('/categories', title);
      return null;
    }
    case 'PATCH': {
      const formData = await request.formData();
      const category = {
        id: formData.get('id'),
        title: formData.get('title'),
      };
      await instance.patch(`/categories/category/${category.id}`, category);
      return null;
    }
    case 'DELETE': {
      const formData = await request.formData();
      const categoryId = formData.get('id');
      await instance.delete(`/categories/category/${categoryId}`);
      return null;
    }

    default:
      break;
  }
};

export const categoryLoader = async () => {
  const { data } = await instance.get<ICategory[]>('/categories');
  return data;
};

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[];
  const [categoryId, setCategoryId] = useState<number>(0);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);

  const handleDeleteConfirmation = (categoryId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      setDeletingCategoryId(categoryId);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, categoryId: number) => {
    if (deletingCategoryId === categoryId) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Your Categories
        </Typography>
        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setVisibleModal(true)}
            style={{ marginTop: '8px' }}>
            Add Category
          </Button>
        </Box>
        <List>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Box key={category.id} boxShadow={2} borderRadius={2} mb={2}>
                <ListItem>
                  <ListItemText primary={category.title} />
                  <ListItemSecondaryAction sx={{ display: 'flex', gap: '10px' }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        setCategoryId(category.id);
                        setVisibleModal(true);
                        setIsEdit(true);
                      }}>
                      <Edit />
                    </IconButton>
                    <Form
                      method="delete"
                      action="/categories"
                      onSubmit={(e) => handleFormSubmit(e, category.id)}>
                      <input type="hidden" name="id" value={category.id} />
                      <IconButton
                        onClick={() => handleDeleteConfirmation(category.id)}
                        edge="end"
                        aria-label="delete"
                        type="submit">
                        <Delete />
                      </IconButton>
                    </Form>
                  </ListItemSecondaryAction>
                </ListItem>
              </Box>
            ))
          ) : (
            <Typography variant="h6" textAlign={'center'}>
              Create your first category!
            </Typography>
          )}
        </List>
      </Box>

      {visibleModal && (
        <CategoryModal type="post" open={visibleModal} setVisibleModal={setVisibleModal} />
      )}

      {visibleModal && isEdit && (
        <CategoryModal
          type="patch"
          id={categoryId}
          open={visibleModal}
          setVisibleModal={setVisibleModal}
        />
      )}
    </Container>
  );
};

export default Categories;
