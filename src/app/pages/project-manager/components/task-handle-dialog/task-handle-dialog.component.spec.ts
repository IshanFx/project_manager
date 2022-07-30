import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHandleDialogComponent } from './task-handle-dialog.component';

describe('TaskHandleDialogComponent', () => {
  let component: TaskHandleDialogComponent;
  let fixture: ComponentFixture<TaskHandleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskHandleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskHandleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
