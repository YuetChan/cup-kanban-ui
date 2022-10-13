import React, { useEffect } from "react";

import { Pagination, Stack } from "@mui/material";

import { useProjectsCacheContext } from "../../../providers/projects-cache";
import { useTagsSearchResultPanelContext } from "../../../providers/tags-search-result-panel";
import { useTasksSearchContext } from "../../../providers/tasks-search";

import TagArea from "../../tag/components/tag-area";

import { searchTagsByProjectIdAndPrefix } from "../../tag/services/tags-service";

import { Tag } from "../../../types/Tag";

const TagsSearchResultPanel = (props: any) => {
  // ------------------ Projects cache ------------------
  const projectsCacheContextState = useProjectsCacheContext().state;

  // ------------------ Task search cache ------------------
  const tasksSearchCacheContextState = useTasksSearchContext().state;
  const tasksSearchCacheContextDispatch = useTasksSearchContext().Dispatch;

  // ------------------ Tags search result panel ------------------
  const tagsSearchResultPanelDispatch = useTagsSearchResultPanelContext().Dispatch;

  const [ tags, setTags ] = React.useState<Array<Tag>>([]);

  const [ page, setPage ] = React.useState(1);
  const [ totalPage, setTotalPage ] = React.useState(1);

  const fetchTags = (projectId: string, page: number) => {
    const timeout = setTimeout(() => {  
      searchTagsByProjectIdAndPrefix(projectId, 
        tasksSearchCacheContextState._tagsEditAreaSearchStr, page).then(res => {
          setTags(res.tags);

          setPage(res.page + 1);
          setTotalPage(res.totalPage === 0? 1 : res.totalPage);
        });
    }, 1000);

    return () => clearTimeout(timeout);  
  }

  useEffect(() => {
    const activeProject = projectsCacheContextState._activeProject;
    if(activeProject) {
      fetchTags(activeProject.id, 0); 
    }
  }, [ tasksSearchCacheContextState._tagsEditAreaSearchStr ]);

  useEffect(() => {
    const activeProject = projectsCacheContextState._activeProject;
    if(activeProject) {
      fetchTags(activeProject.id, 0); 
    }
  }, [ projectsCacheContextState._activeProject ]);

  const handleOnPageChange = (e: any, val: number) => {
    const activeProject = projectsCacheContextState._activeProject;
    if(activeProject) {
      fetchTags(activeProject.id, val - 1); 
    }
  } 

  const handleOnMouseEnter = () => {
    tagsSearchResultPanelDispatch({
      type: 'mouse_enter'
    });
  }

  const handleOnMouseLeave = () => {
    tagsSearchResultPanelDispatch({
      type: 'mouse_leave'
    });

    tasksSearchCacheContextDispatch({
      type: 'tagsEditArea_setFocus'
    });
  }

  // ------------------ Html template ------------------
  return (
    <section style={{
      width: "360px",
      height: "210px",

      position: "fixed",
      bottom: "0px",
      right: "4px",
      zIndex: "99999",
      
      backgroundColor: "white",
      borderRadius: "4px",
      padding: "4px 4px 0px 4px"
      }}
      onMouseEnter={ handleOnMouseEnter }
      onMouseLeave={ handleOnMouseLeave }>
      <Stack 
        direction="column" 
        justifyContent="space-between" 
        style={{
          height: "100%",
          padding: "4px 0px 4px 4px"
          }}>
        <Stack 
          direction="row"
          spacing={0.5}
          style={{  
            flexWrap: "wrap",
            overflowY: "auto",
            }}>
          { 
            tags.length > 0
            ? tags.map(tag =>  (<TagArea tag={ tag.name } showDelete={ false } />))
            : null
          }
        </Stack>

        <Pagination 
          color="primary"
          count={ totalPage } 
          page={ page } 
          onChange={ handleOnPageChange }
          style={{ paddingTop: "4px" }}/>
      </Stack>
    </section>
  )
}

export default TagsSearchResultPanel;