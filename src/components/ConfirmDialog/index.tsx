import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { ConfirmDialogStyle } from "./style";

export const ConfirmDialog = ({open, setOpen, titleMessage, responseYes, responseNo}: any) => {

 
  const handleCloseYes = () => {

    setOpen(false);
    responseYes();
  };
  const handleCloseNo = () => {

    setOpen(false);
    responseNo();
  };

 
  return (
    <div>
      
      <ConfirmDialogStyle
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titleMessage}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseNo}>Não</Button>
          <Button onClick={handleCloseYes} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </ConfirmDialogStyle>
    </div>
  );
}