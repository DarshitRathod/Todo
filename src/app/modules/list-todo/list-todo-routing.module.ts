import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from '../list-todo/components/todoList/todo-list.component';


const routes: Routes = [
  {path:'todo/listTodo/:id',component:TodoListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTodoRoutingModule { }
