import React, { useEffect } from "react";

import { Stack, TextField } from "@mui/material";

import TagArea from "./tag-area";

interface TagsEditsAreaProps {
  label?: string,
  inputRef?: any,
  disabled?: boolean,
  tags?: Array<string>,
  handleOnTagsChange?: Function,
  handleOnTextFieldChange?: Function,
  handleOnKeyPress?: Function,
  handleOnFocus?: Function,
  handleOnBlur?: Function
}

const TagsEditArea = (props: TagsEditsAreaProps) => {
  const [ tags, setTags ] = React.useState<Array<string>>([])
  const [ tagInput, setTagInput ] = React.useState('');

  useEffect(() => {
    setTags(props.tags? props.tags : []);
  }, []);

  useEffect(() => {
    if(props.handleOnTagsChange) {
      props.handleOnTagsChange(tags);
    } 
  }, [ tags ]);

  const handleOnDeleteClick = (e: any, tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  }

  const handleOnTextFieldChange = (e: any) => {
    if(props.handleOnTextFieldChange) {
      props.handleOnTextFieldChange(e);
    }

    setTagInput(e.target.value);
  }

  const handleOnKeyPress = (e: any) => {
    const newTag = e.target.value;

    if(e.keyCode === 13) {
      if(tags.filter(tag => tag === newTag).length <= 0) {
        setTags([... tags, newTag]);
        setTagInput('');
      }
    }

    if(props.handleOnKeyPress) {
      props.handleOnKeyPress(e);
    }
  }

  const handleOnFocus = (e: any) => {
    if(props.handleOnFocus) {
      props.handleOnFocus(e);
    }
  }

  const handleOnBlur = () => {
    if(props.handleOnBlur) {
      props.handleOnBlur();
    }
  }

  return (
    <section>
      <Stack direction="column" alignItems="start" spacing={ 1 }>
        <TextField 
          label={ props.label? props.label : ""  } 
          disabled={ props.disabled? props.disabled : true }
          variant="standard" 
          onChange={ (e) => handleOnTextFieldChange(e) }
          onKeyDown={ handleOnKeyPress }
          onFocus= { (e) => handleOnFocus(e) }
          onBlur={ handleOnBlur }
          value={ tagInput } 
          style={{ width: "150px" }}
          inputRef={ props.inputRef }/>
          {
            tags.length > 0 
            ? (
                <Stack 
                  direction="row" 
                  spacing={ 0.5 } 
                  style={{ flexWrap: "wrap" }}>
                  {
                    tags.map(tag => {
                      return (
                        <TagArea 
                          tag={tag}
                          showDelete={true}
                          handleOnDeleteClick={ handleOnDeleteClick } />
                      )
                    })
                  }
                </Stack>
              )
            : null
          }
      </Stack>
    </section>
  )
}

export default TagsEditArea;