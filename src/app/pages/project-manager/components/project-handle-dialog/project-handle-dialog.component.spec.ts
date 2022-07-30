import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHandleDialogComponent } from './project-handle-dialog.component';

describe('ProjectHandleDialogComponent', () => {
  let component: ProjectHandleDialogComponent;
  let fixture: ComponentFixture<ProjectHandleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectHandleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectHandleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
