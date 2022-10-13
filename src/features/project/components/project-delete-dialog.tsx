import React, { useEffect } from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";

interface ProjectDeleteDialogProps {
  open?: boolean,
  label?: string,
  
  handleOnClose?: Function,
  handleOnDelete?: Function
}

const ProjectDeleteDialog = (props: ProjectDeleteDialogProps) => {
  const [ enable, setEnable ] = React.useState(false);
  const [ value, setValue ] = React.useState('');

  const handleOnClose = () => {
    if(props.handleOnClose) {
      props.handleOnClose();
    }

    setValue('');
  }

  const handleOnDelete = () => {
    if(props.handleOnDelete) {
      props.handleOnDelete();
    }
  }

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    setEnable(value === 'DELETE');
  }, [ value ]);

  // -------------- HTML template --------------
  return (
    <section>
      <Dialog
        open={ props.open? props.open : false }
        onClose={ handleOnClose }
        scroll={ "paper" }
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              minWidth: "350px",
              width: "350px"
            },
          },
        }}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <div>{ props.label? props.label : "" }</div>
          </Stack>
        </DialogTitle>
  
        <DialogContent dividers={ true }>
          <DialogContentText
            tabIndex={ -1 }
            sx={{ marginBottom:"12px" }}>
            <p>Please enter DELETE to confirm the deletion</p>  
            
            <TextField placeholder="DELETE" onChange={ handleOnChange } value={ value }/>
          </DialogContentText>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={ handleOnClose }>Cancel</Button>
          <Button 
            disabled={ !enable } 
            onClick={ handleOnDelete }
            color="error">
              Delete
          </Button>
        </DialogActions>
      </Dialog>
    </section>
    )
}

export default ProjectDeleteDialog;