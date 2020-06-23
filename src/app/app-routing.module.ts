import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserlistComponent} from '../app/modules/list-user/components/userlist/userlist.component';

const routes: Routes = [
  {path:'',redirectTo:'users',pathMatch:'full'},
  {path:'**',redirectTo:'users',pathMatch:'full'},
  {path:'users',loadChildren: () => import('./../app/modules/list-user/list-user.module').then(m => m.ListUserModule)},
  {path:'todo',loadChildren: () => import('./../app/modules/list-todo/list-todo.module').then(m => m.ListTodoModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
