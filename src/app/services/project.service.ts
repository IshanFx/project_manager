import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { projects } from '../data/projectData';
import { Project } from 'src/app/model/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  getProjects():Project[] {
    return projects;
  }

}
