import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { ProjectService } from 'src/app/services/project/project.service';

import { Project } from 'src/app/model/Project';
import { ProjectTask } from 'src/app/model/ProjectTask';

import { faTrashAlt,faPlusSquare,faEdit,faFolder,faFolderOpen, } from '@fortawesome/free-regular-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

import { ViewType } from 'src/app/enum/ViewType';
import { Action } from 'src/app/enum/Actions';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  constructor(private projectService:ProjectService) { }

  public currentProjectList:Project[] = []
  public tempViewType = ViewType;
  public searchWord: string = ""

  public selectedView: ViewType | undefined;

  public selectedProject: Project | undefined;

  public selectedTask: ProjectTask | undefined;
  public selectedTaskSub: ProjectTask | undefined;
  public selectedTaskType: string | undefined;
  public selectedTaskProject: Project | undefined;
  public selectedTaskParent: Project | ProjectTask | undefined;

  public dialogActionType: Action | undefined

  projectForm:UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('',Validators.required)
  })

  taskForm:UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('',Validators.required),
    status: new UntypedFormControl('active',Validators.required),
    description: new UntypedFormControl('')
  })

  //icons
  faTrashAlt = faTrashAlt;
  faAdd = faPlusSquare;
  faEdit = faEdit;
  faFolder = faFolder;
  faFolderOpen = faFolderOpen;
  faTasks = faTasks;

  ngOnInit(): void {
    this._loadProjects()
  }

  private _loadProjects() {
    this.currentProjectList = this.projectService.getProjects()
  }

  public showProjectEditDialog(project:Project) {
    this.selectedProject = project
    this.dialogActionType = Action.Update
    console.log(project)
    this.selectedView = ViewType.Project
  }

  public handleProjectDialogAction(event:any){
    if(event.project){

      if(event.action == 'create'){
        let project = event.project as Project;

        const projectId = this.currentProjectList.length + 1;
  
        let projectObj:Project = {
          id:projectId,
          name: project.name
        }
    
        this.currentProjectList.push(projectObj)

      } else if(event.action == 'update'){
        if(this.selectedProject){
          let project = event.project as Project;
          this.selectedProject.name = project.name;
        }
      }
      this.projectService.saveProjects(this.currentProjectList)
    }
    this.selectedView = undefined
  }

  public showTaskEditDialog(task:ProjectTask,selectedTaskType:string) {
    this.selectedTask = task;
    this.selectedView = ViewType.Task
    this.dialogActionType = Action.Update
    this.selectedTaskType = selectedTaskType
  }

  public showAddProjectSubTask(task:Project) {
    this.selectedView = ViewType.Task
    this.dialogActionType = Action.Create
    this.selectedTaskType = "project"
    this.selectedTaskProject = task;
    this.selectedTask = undefined
  }

  public showAddTaskSubTask(task:ProjectTask){
    this.selectedView = ViewType.Task
    this.selectedTaskType = "sub"
    this.dialogActionType = Action.Create
    this.selectedTaskSub = task;
    this.selectedTask = undefined
  }

  public handleTaskDialogAction(event:any){
    if(event.task){

      if(event.action == 'create'){

        let taskDetails = event.task as ProjectTask;
        
        if(this.selectedTaskType == 'project'){

          let taskId = 1;
            if(this.selectedTaskProject && this.selectedTaskProject.tasks){
              taskId = this.selectedTaskProject.tasks.length + 1
            }

            let task:ProjectTask = {
              id:taskId,
              name: taskDetails.name,
              description: taskDetails.description,
              status: taskDetails.status
            }

            let projectIndex = this.currentProjectList.findIndex(proj => proj.id == this.selectedTaskProject?.id)

            if(!this.currentProjectList[projectIndex].tasks){
              this.currentProjectList[projectIndex].tasks = [];
            }
            this.currentProjectList[projectIndex]?.tasks?.push(task)
            this.projectService.saveProjects(this.currentProjectList)

          this.selectedTaskProject?.id

        } else if(this.selectedTaskType == 'sub' && this.selectedTaskSub){
              let taskId = 1;
              if(this.selectedTaskSub.children){
                taskId = this.selectedTaskSub.children.length + 1
              }

              let task:ProjectTask = {
                id:taskId,
                name: taskDetails.name,
                description: taskDetails.description,
                status: taskDetails.status
              }

              if(!this.selectedTaskSub.children){
                this.selectedTaskSub.children = []
              }

              this.selectedTaskSub.children.push(task)
        }

      } else if(event.action == 'update'){
        if(this.selectedTask){
          let task = event.task as ProjectTask;
  
          this.selectedTask.name = task.name;
          this.selectedTask.description = task.description;
          this.selectedTask.status = task.status;
  
        }
      }
     
      this.projectService.saveProjects(this.currentProjectList)
    }
    this.selectedView = undefined
  }

  public deleteAProject(project:Project){
    let projectIndex = this.currentProjectList.findIndex(cProject => cProject.id == project.id)
    this.currentProjectList.splice(projectIndex,1)
    this.projectService.saveProjects(this.currentProjectList)
  }

  public deleteParentTask(parent:Project,task:ProjectTask,index:number){
    parent.tasks?.splice(index,1)
    this.projectService.saveProjects(this.currentProjectList)
  }

  public deleteSubTask(parent:ProjectTask,task:ProjectTask,index:number){
    parent.children?.splice(index,1)
    this.projectService.saveProjects(this.currentProjectList)
  }

  public showAddNewProjectDialog(){
    this.dialogActionType = Action.Create;
    this.selectedView = ViewType.Project;
  }

  public triggerSearch(value:string){
    this.searchWord = value;
    let matchProj = undefined;

    if(!value){
      this.currentProjectList = this.projectService.getProjects()
      return;
    }

    this.currentProjectList = this.projectService.getProjects()

    for(let c = 0 ; c < this.currentProjectList.length; c++){
        let currentProj = this.currentProjectList[c];
        if(currentProj.name.includes(value)){
          matchProj = currentProj;
          break
        }else if( currentProj.tasks){
          for(let i = 0 ; i < currentProj.tasks.length ; i++){
            let childTask = currentProj.tasks[i];
            if(childTask.name.includes(value)){
              matchProj = currentProj;
              break;
            } else if(childTask.children){
              let result = this._searchKeyword(childTask.children,value)
              if(result){
                matchProj = currentProj;
                break;
              }
            }
          }
          if(matchProj){
            break;
          }
        }
    }

    if(matchProj){
      this.currentProjectList = [matchProj]
    } else{
      this.currentProjectList = []
    }
  }

  private _searchKeyword(tasks:ProjectTask[] | undefined,value:string):any{

    if(tasks){
      for(let c = 0 ; c < tasks.length; c++){
        if(tasks[c].name.includes(value)){
          return true;
        } else if(tasks[c].children){
          return this._searchKeyword(tasks[c].children,value)
        }
      }
      return false;
    }else{
      return false;
    }
    
  }

}
