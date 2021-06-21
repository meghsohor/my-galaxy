import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function ConfirmDialog(props) {
  const { onClose, open, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(true);
  };


  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>
        Are you sure?
      </DialogTitle>
      <DialogContent dividers>
        <h6>Do you want to delete this item?</h6>
      </DialogContent>
      <DialogActions className="py-3">
        <Button color="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleOk} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}