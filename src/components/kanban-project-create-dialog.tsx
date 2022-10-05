import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";

import { useKanbanUsersContext } from "../providers/kanban-users";
import KanbanDrawerSecretMenu from "./kanban-drawer/kanban-drawer-secret-menu";

const KanbanFirstProjectCreateDialog = (props: any) => {
  // ------------------ User ------------------
  const usersContextState = useKanbanUsersContext().state;

  // ------------------ Project create dialog ------------------
  const [ projectName, setProjectName ] = React.useState('');

  const handleOnProjectNameChange = (e) => {
    setProjectName(e.target.value);
  }  
  
  const handleOnProjectCreateClick = () => {
    if(props.handleOnProjectCreateClick) {
      props.handleOnProjectCreateClick({
        name: projectName,
        userEmail: usersContextState._loginedUserEmail
      });
    } 

    setProjectName('');
  }

  const handleOnLogoutClick = () => {
    if(props.handleOnLogout) {
      props.handleOnLogout();
    }
  }

  const handleOnClose = () => {
    if(props.handleOnClose) {
      props.handleOnClose();
    }

    setProjectName('');
  }

  // ------------------ Secret menu ------------------
  const [ secretMenuAnchorEl, setSecretMenuAnchorEl ] = React.useState<null | HTMLElement>(null);
  const secretMenuOpen = Boolean(secretMenuAnchorEl);
  
  const handleSecretMenuClose = () => {
    setSecretMenuAnchorEl(null);
  }
  
  const handleOnSecretClick = (e) => {
    setSecretMenuAnchorEl(e.currentTarget);
  }

  // ------------------ HTML template ------------------

  return (
    <Dialog 
      open={ props.open } 
      onClose={ handleOnClose }>
      <DialogTitle>{ props.title }</DialogTitle>
      
      <DialogContent>
        <DialogContentText>
        { props.description }
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          label="Project name"
          fullWidth
          variant="standard" 
          value={ projectName }
          onChange={ (e) => handleOnProjectNameChange(e) } />
      </DialogContent>

      <DialogActions>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          style={{
            width: "100%"
          }}>
          <Stack direction="row" spacing={ 0.5 }>
            <Button 
              style={{ display: props.showLogout? "block": "none" }}
              variant="outlined" 
              onClick={ handleOnLogoutClick }>
              Logout
            </Button>

            <Button 
              style={{ display: props.showLogout? "block": "none" }}
              variant="outlined" 
              onClick={ handleOnSecretClick }>
              Secret
            </Button>
          </Stack>
        </Stack>

        <Button 
          variant="outlined" 
          onClick={ handleOnProjectCreateClick }>
          Create
        </Button>
      </DialogActions>

      <KanbanDrawerSecretMenu 
        secretMenuAnchorEl={ secretMenuAnchorEl }
        secretMenuOpen={ secretMenuOpen }
        handleSecretMenuClose={ handleSecretMenuClose } />  
    </Dialog>
  )
}

export default KanbanFirstProjectCreateDialog;