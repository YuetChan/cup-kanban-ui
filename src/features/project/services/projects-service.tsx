import axios from "axios"
import { Project } from "../../../types/Project";

const localhost = 'http://localhost:8080/projects';

const getProjectById = (id: string) => {
  return axios.get(`${localhost}/${id}`).then(res => {
    return res.data.data.project;
  });
}

const searchProjectsByUserEmail = (email: string, start: number) => {
  return axios.get(`${localhost}?userEmail=${email}&start=${start}`).then(res => {
    const data = res.data.data;

    return {
      projects: data.projects,
      page: data.page,
      totalPage: data.totalPage
    };
  });
}

const searchShareProjectsByUserEmail = (email: string, start: number) => {
  return axios.get(`${localhost}/share?email=${email}&start=${start}`).then(res => {
    const data = res.data.data;

    return {
      projects: data.projects,
      page: data.page,
      totalPage: data.data.totalPage
    };
  });
}

const createProject = (project: Project) => {
  return axios.post(`${localhost}`, {
    data: {
      project: project
    }
  }).then(res => res.data.data.project);
}

const deleteProject = (id: string) => {
  return axios.delete(`${localhost}/${id}`).then(res => res);
}

const updateProjectById = (id: string, project: Project, collaboratorEmailSecretMap: any) => {
  return axios.patch(`${localhost}/${id}`, {
    data: {
      project: project,
      collaboratorEmailSecretMap: collaboratorEmailSecretMap
    }
  }).then(res => res)
}


export {
  getProjectById, 
  searchProjectsByUserEmail, 
  searchShareProjectsByUserEmail, createProject, deleteProject,
  updateProjectById
}