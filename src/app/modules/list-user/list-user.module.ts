import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from './components/userlist/userlist.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule,} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/addEditDialog/addEditDialog.component';
import { DialogAlertComponent } from './components/dialogAlert/dialog-alert.component'
import { ListUserRoutingModule } from './list-user-routing.module';
import {ListTodoModule} from '../list-todo/list-todo.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [UserlistComponent,  DialogComponent,  DialogAlertComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ListUserRoutingModule,
    ListTodoModule,
    MatProgressBarModule
  ],
  entryComponents: [
    DialogComponent
  ],
  exports:[UserlistComponent,DialogComponent,DialogAlertComponent]

})
export class ListUserModule { }
