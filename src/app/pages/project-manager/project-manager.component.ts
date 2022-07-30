import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProjectService } from 'src/app/services/project.service';

import { Project } from 'src/app/model/Project';
import { ProjectTask } from 'src/app/model/ProjectTask';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  constructor(private projectService:ProjectService) { }

  public currentProjectList:Project[] = []

  public selectedView: "project" | "task" | undefined;
  public selectedProject: Project | undefined;
  public selectedTask: ProjectTask | undefined;

  projectForm:FormGroup = new FormGroup({
    name: new FormControl('',Validators.required)
  })

  taskForm:FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    status: new FormControl('active',Validators.required),
    description: new FormControl('')
  })


  ngOnInit(): void {
    this._loadProjects()
  }

  private _loadProjects() {
    this.currentProjectList = this.projectService.getProjects()
  }

  public taskSelected(task:ProjectTask) {
    this.selectedView = 'task'
    this.selectedTask = task;
    this.taskForm.patchValue({'name':task.name})
    this.taskForm.patchValue({'description':task.description})
    this.taskForm.patchValue({'status':task.status})
    console.log(task)
  }

  public projectSelected(project:Project) {
    this.selectedView = 'project'
    this.selectedProject = project
    this.projectForm.patchValue({'name':this.selectedProject.name})
    console.log(project)
  }

  public updateAProject(){
    if(this.projectForm.valid){
      if(this.selectedProject){
        this.selectedProject.name = this.projectForm.get('name')?.value;

        this._resetProjectForm();
      }
    }
}
  public updateATask(){
    if(this.taskForm.valid){
      if(this.selectedTask){
        this.selectedTask.name = this.taskForm.get('name')?.value;
        this.selectedTask.description = this.taskForm.get('description')?.value;
        this.selectedTask.status = this.taskForm.get('status')?.value;

        this._resetTaskForm();
      }
    }
  }

  private _resetProjectForm(){
    this.taskForm.reset()
  }

  private _resetTaskForm(){
    this.taskForm.reset()
  }


}
