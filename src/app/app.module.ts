import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ListUserModule} from '../app/modules/list-user/list-user.module';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListTodoModule } from './modules/list-todo/list-todo.module';
import { UserdataService } from './userdata.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ListUserModule,
    ListTodoModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTableModule,
    AppRoutingModule
  ],
  exports: [

  ],
  providers: [UserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
