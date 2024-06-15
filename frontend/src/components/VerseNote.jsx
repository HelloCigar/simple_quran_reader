import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import {Tooltip} from '@mui/material';

function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <Tooltip title="Notes">
            <IconButton aria-label="toggle-bookmark" size="large" onClick={handleClickOpen}>
                {open ? <DescriptionIcon fontSize="inherit" color="primary"/> : <DescriptionIcon disabled fontSize="inherit"/>}
            </IconButton>
        </Tooltip>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const note = formJson.note;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Notes</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            autoFocus
            required
            margin="dense"
            id="note"
            name="note"
            label="Add a note  here"
            type="text"
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog