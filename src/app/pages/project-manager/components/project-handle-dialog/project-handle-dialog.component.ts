import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { Action } from 'src/app/enum/Actions';
import { Project } from 'src/app/model/Project';


@Component({
  selector: 'app-project-handle-dialog',
  templateUrl: './project-handle-dialog.component.html',
  styleUrls: ['./project-handle-dialog.component.scss']
})
export class ProjectHandleDialogComponent implements OnInit {

  
  @Input() project:Project | undefined;
  @Input() action: Action | undefined;
  @Output() closeModalDialog = new EventEmitter();
  
  constructor(private element:ElementRef) { }

  projectForm:UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('',Validators.required)
  })
  
  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement)
    if(this.action == Action.Update){
      this.projectForm.get('name')?.setValue(this.project?.name)
    }
  }
  public closeDialog(){
    this.closeModalDialog.emit({});
  }

  public proceedProjectAction(){
    if(this.projectForm.valid){
      let projectObj: Project = { 
        id:0,
        name: this.projectForm.get('name')?.value
      }
      this.closeModalDialog.emit({action:this.action,project:projectObj})
      this.projectForm.reset()
    }
  }

  ngOnDestroy(){
    this.element.nativeElement.remove()
  }
}
