import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { Action } from 'src/app/enum/Actions';
import { ProjectTask } from 'src/app/model/ProjectTask';

@Component({
  selector: 'app-task-handle-dialog',
  templateUrl: './task-handle-dialog.component.html',
  styleUrls: ['./task-handle-dialog.component.scss']
})
export class TaskHandleDialogComponent implements OnInit {

  @Input() task:ProjectTask | undefined;
  @Input() action: Action | undefined;

  @Output() closeModalDialog = new EventEmitter();

  taskForm:UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('',Validators.required),
    status: new UntypedFormControl('',Validators.required),
    description: new UntypedFormControl('')
  })


  constructor(private element:ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement)

    if(this.action == Action.Update){
      this.taskForm.get('name')?.setValue(this.task?.name)
      this.taskForm.get('status')?.setValue(this.task?.status)
      this.taskForm.get('description')?.setValue(this.task?.description)
    }
  }

  public proceedTaskAction(){
    if(this.taskForm.valid){
      let taskObj: ProjectTask = { 
        id:this.task?.id || 0,
        name: this.taskForm.get('name')?.value,
        description: this.taskForm.get('description')?.value,
        status: this.taskForm.get('status')?.value,
      }
      this.closeModalDialog.emit({action:this.action,task:taskObj})
      this.taskForm.reset()
    }
  }

  public closeDialog(){
    this.closeModalDialog.emit({});
  }

  ngOnDestroy(){
    this.element.nativeElement.remove()
  }
}
