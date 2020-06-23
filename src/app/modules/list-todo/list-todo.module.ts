import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTodoRoutingModule } from './list-todo-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todoList/todo-list.component';
import {MatIconModule} from '@angular/material/icon';
import { DialogComponent } from './components/addEditDialog/addEditDialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [TodoListComponent, DialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    ListTodoRoutingModule,
  ],
  exports:[TodoListComponent,DialogComponent]
})
export class ListTodoModule { }
