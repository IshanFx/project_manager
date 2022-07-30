import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchComponent } from './shared/search/search.component'
import { ProjectManagerComponent } from './pages/project-manager/project-manager.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskHandleDialogComponent } from './pages/project-manager/components/task-handle-dialog/task-handle-dialog.component';
import { ProjectHandleDialogComponent } from './pages/project-manager/components/project-handle-dialog/project-handle-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProjectManagerComponent,
    TaskHandleDialogComponent,
    ProjectHandleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
