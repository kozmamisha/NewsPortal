import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FC } from 'react';
import { Form } from 'react-router-dom';

interface ICategoryModal {
  open: boolean;
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void;
}

const CategoryModal: FC<ICategoryModal> = ({ id, type, open, setVisibleModal }) => {
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <Form action="/categories" method={type} onSubmit={() => setVisibleModal(false)}>
        <DialogTitle>Category title</DialogTitle>
        <DialogContent style={{ paddingTop: '7px' }}>
          <TextField
            type="text"
            name="title"
            label="Category Name"
            variant="outlined"
            fullWidth
            autoFocus
          />
          <input type="hidden" name="id" value={id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVisibleModal(false)} color="error">
            Close
          </Button>
          <Button color="success" variant="contained" type="submit">
            {type === 'patch' ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CategoryModal;
