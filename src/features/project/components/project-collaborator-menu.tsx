import React from "react";

import { Menu, MenuItem, Stack } from "@mui/material";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { getProjectById, updateProjectById } from "../services/projects-service";

import { useProjectsCacheContext } from "../../../providers/projects-cache";
import { useUserCacheContext } from "../../../providers/user-cache";
import { User } from "../../../types/User";

interface ProjectCollaboratorMenuProps {
  collaboratorsMenuAnchorEl: any,
  collaboratorsMenuOpen: boolean,
  handleOnCollaboratorsMenuClose?: Function
}

const ProjectCollaboratorMenu = (props: ProjectCollaboratorMenuProps) => {
  // ------------------ Projects cache ------------------
  const projectsCacheContextState = useProjectsCacheContext().state;
  const projectsCacheContextDispatch = useProjectsCacheContext().Dispatch;

  // ------------------ User cache ------------------
  const userCacheContextState = useUserCacheContext().state;

  // ------------------ Project collaborator menu ------------------
  const handleOnQuitProjectClick = () => {
    const activeProject = projectsCacheContextState._activeProject;
    if(activeProject) {
      const activeCollaboratorEmails = activeProject.collaboratorList.map(collaborator => collaborator.email);

      const updatedCollaboratorEmails = activeCollaboratorEmails.filter(email => 
        email !== userCacheContextState._loginedUserEmail);
      const updatedCollaborators = updatedCollaboratorEmails.map(email => {
        return { 
          email: email 
        } as User;
      });
  
      const updatedProject = {
        ... activeProject,
        collaboratorList: updatedCollaborators
      }
  
      updateProjectById(activeProject.id, updatedProject, new Map()).then(res => {
        alert('You are removed');
  
        getProjectById(activeProject.id).then(res => {
          projectsCacheContextDispatch({
            type: 'activeProject_update',
            value: undefined
          });
        });
      }).catch(err => {
        console.log(err);
        alert('Opps, failed to remove yourself from project')
      });
    }
  }

  return (
    <Menu
      anchorEl={ props.collaboratorsMenuAnchorEl }
      open={ props.collaboratorsMenuOpen }
      onClose={ () => {
        if(props.handleOnCollaboratorsMenuClose){
          props.handleOnCollaboratorsMenuClose()
        }
      } }
      PaperProps={{ style: { maxHeight: "360px" }}}>
      <MenuItem 
        key="remove_self" 
        value="remove_self"
        onClick={ handleOnQuitProjectClick }>
        <Stack 
          direction="row" 
          justifyContent="center" 
          spacing={ 1 }>
          <ExitToAppIcon />

          <div>Quit project</div>
        </Stack>
      </MenuItem>  
    </Menu>     
  )
}

export default ProjectCollaboratorMenu;
