import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, {useState} from "react";

export const ErrorSnackbar = ({message}) => {

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
      <Alert variant="filled" elevation={6} severity = "error">
        {message}
      </Alert>
    </Snackbar>
  );

}

export default ErrorSnackbar;