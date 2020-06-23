import { UserlistComponent } from './components/userlist/userlist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { TodoListComponent } from '../list-todo/components/todoList/todo-list.component';


const routes: Routes = [
  {path:'',component:UserlistComponent},
  {path:'users/todo/:id',redirectTo:'todo/listTodo/:id',pathMatch:'full'},
  {path:'todo/:id',redirectTo:'todo/listTodo/:id',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUserRoutingModule { }
