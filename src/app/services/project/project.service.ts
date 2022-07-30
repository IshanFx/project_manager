import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { projects } from '../../data/projectData';
import { Project } from 'src/app/model/Project';
import { StorageHandler } from 'src/app/utils/storageHandler';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { 
  }

  //This can extend to get project from external API
  getProjects():Project[] {
    let handler = new StorageHandler()
    let projectsLocalStorage = handler.getLocalStorageValue('projects')

    if(projectsLocalStorage){
      return JSON.parse(projectsLocalStorage) as Project[];
    } else{
      return projects
    }
  }

  saveProjects(projects:Project[]){
    let handler = new StorageHandler()
    handler.setLocalStorage('projects',projects)
  }

}
