import { element } from 'protractor';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { UserdataService } from './../../../../userdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../addEditDialog/addEditDialog.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public chooseUser:number;
  public chooseUserName:string;
  public noTaskFound = false;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private userDataService:UserdataService,public dialog: MatDialog,private route: ActivatedRoute,private _location: Location) {  }

  public dataSource = [];
  displayedColumns: string[] = ['id', 'task', 'description','actions'];

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '302px',
      // height:'290px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined){
        this.errorRowData();
      }else if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Edit'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        //this.deleteRowData(result.data)
      }
    });
  }

  //Add Todo
  addRowData(row_obj){
    if(this.userDataService.addTodo(row_obj,this.chooseUser)){
        this.dataSource.push({
          id: this.userDataService.userAndTodoData['todo'].length,
          userid:this.chooseUser,
          task:row_obj.task,
          description:row_obj.description
        });
      this.table.renderRows();
    }
    console.log("After Adding  Todo data is ",this.dataSource)
  }

  //Edit Todo
  updateRowData(row_obj){
    if(this.userDataService.editTodo(row_obj,this.chooseUser)){
      this.dataSource.forEach((element)=>{
        if(element.id === row_obj.id && element.userid === this.chooseUser){
          element.description = row_obj.description.trim();
          element.task = row_obj.task.trim();
          element.id = row_obj.id;
          element.userid = this.chooseUser;
        }
      })
      this.table.renderRows();
    }
   console.log("After Updating Todo data is ",this.dataSource)
  }

  //Delete Todo
  deleteRowData(action,row_obj){

    if(this.userDataService.deleteTodo(row_obj,this.chooseUser)){
        let j=0;
        this.dataSource.forEach((element)=>{
          if(element.id === row_obj.id && element.userid === this.chooseUser){
            this.dataSource.splice(j,1);
          }
        j++;
      })
      this.table.renderRows();
    }
    console.log("After Delete  Todo data is ",this.dataSource)
  }

  errorRowData(){
    console.log("")
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log("PARAM is ",params.get('id'))
      this.chooseUser = +params.get('id');

      //Push Selected User's Data into DataSource
      this.userDataService.userAndTodoData['todo'].forEach((element)=>{
        if(element.userid === this.chooseUser){
          this.dataSource.push(element);
        }
      })
    })

    //Selected User Name to be display when listing of todos
    this.userDataService.userAndTodoData['user'].forEach((element)=>{
      if(element.id === this.chooseUser){
        this.chooseUserName = element.firstName + " " + element.lastName;
      }
    })

    if(this.dataSource.length === 0){
      this.noTaskFound =  false;
    }else{
      this.noTaskFound =  true;
    }
  }

  backClicked() {
    this._location.back();
  }
}
