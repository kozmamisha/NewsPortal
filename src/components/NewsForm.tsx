import { FC } from 'react';
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseNewsLoader } from '../types/types';

const NewsForm: FC = () => {
  const { categories } = useLoaderData() as IResponseNewsLoader;

  return (
    <>
      <Typography mt={4} variant="h4" gutterBottom>
        Create News
      </Typography>
      <Form method="post" action="/news">
        <TextField
          id="title"
          type="string"
          name="title"
          label="Title"
          variant="outlined"
          margin="dense"
          inputProps={{ maxLength: 50 }}
          fullWidth
          required
        />
        <TextField
          id="description"
          type="string"
          name="description"
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          margin="dense"
          required
        />
        {categories.length ? (
          <FormControl margin="dense">
            <InputLabel id="select-label">Select Category</InputLabel>
            <Select
              name="category"
              labelId="select-label"
              id="select"
              label="Select Category"
              style={{ width: '350px', maxWidth: '30vw', minWidth: '250px' }}
              required>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Typography color={'red'}>To continue create a category first!</Typography>
        )}
        <Button sx={{ display: 'block', mt: 1 }} type="submit" variant="contained" color="primary">
          Create
        </Button>
      </Form>
    </>
  );
};

export default NewsForm;
