import React from 'react';
import { IconButton, Stack } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import toMaterialStyle from 'material-color-hash';

interface TagAreaProps {
  tag: string,
  showDelete?: boolean,

  handleOnDeleteClick?: Function
}

const KanbanTagArea = (props: TagAreaProps) => {
  const { tag } = props;

  const style = {
    ... toMaterialStyle(tag),
    fontSize: "14px",
    padding: "0px 2px"
  };

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      sx={ style }>
      <div>{ tag? tag : "" }</div>
      &nbsp;

      {
        (props.showDelete? props.showDelete : false)
        ? (
          <IconButton 
            aria-label="delete"
            sx={{ padding: "0px" }}
            onClick={ (e: any) => {
              if(props.handleOnDeleteClick) {
                props.handleOnDeleteClick((e, tag))
              }
            } }>
            <CloseIcon fontSize='small' />
          </ IconButton>
          )
        : null
      }
    </Stack>
  )
}

export default KanbanTagArea;