import { Component, OnInit,Inject,Optional,HostListener,Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserdataService} from '../../../../userdata.service';


export interface TodoData {
  task: string;
  description: string;
  id:number;
  userid:number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './addEditDialog.component.html',
  styleUrls: ['./addEditDialog.component.css']
})
export class DialogComponent implements OnInit {

/********************************************** Properties ******************************************/
  form: FormGroup;
  local_data:any;
  todoList:any;
  todoObj = {
    task:"",
    description:"",
    id:0,
    userid:0,
    action:"",
  }

/********************************************** Constructor ******************************************/
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private userDataService:UserdataService,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) private data:TodoData)
    {}



/********************************************** Methods ******************************************/

    ngOnInit(): void {
  if(this.data.hasOwnProperty("action")){
    this.todoObj.action = "Add";
  }
  if(this.data.hasOwnProperty("id")){
    this.todoObj.id = this.data.id;
  }
  if(this.data.hasOwnProperty("task") && this.data.hasOwnProperty("description")){
    this.todoObj.task = this.data.task;
    this.todoObj.description = this.data.description;
    this.local_data = this.data;
    this.todoObj.action = this.local_data.action;
    this.todoObj.userid = this.data.userid;
  }

  this.todoList = this.userDataService.getTodoData();
    }

    //Task and description field check
    addEditAction(){
      //------------------------1-way--------------------------------------

      if(this.todoObj.action === 'Add'){

          this.todoObj.task = this.todoObj.task.trim();
          this.todoObj.description = this.todoObj.description.trim();
          this.todoObj.action = this.todoObj.action;
          this.todoObj.userid = this.todoObj.userid;
          console.log("todoObj",this.todoObj)
          this.dialogRef.close({event:this.todoObj.action,data:this.todoObj})
      }
      if(this.todoObj.action === 'Edit'){

        // if(this.outTask === undefined){
        //   this.outTask = this.task
        // }
        // if(this.outDescription === undefined){
        //   this.outDescription= this.description
        // }
        this.todoObj.id = this.todoObj.id;
        this.todoObj.task = this.todoObj.task.trim(),
        this.todoObj.description =  this.todoObj.description.trim(),
        this.todoObj.action = this.todoObj.action,
        this.todoObj.userid = this.todoObj.userid,
        console.log("after",this.todoObj)
        this.dialogRef.close({event:this.todoObj.action,data:this.todoObj})
      }

    }

    //Close Dialog
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
      console.log("Todo's after closing " ,this.todoList)
    }

    //Escape Key Check
    @HostListener('document:keydown.escape', ['$event'])
    randomClick(){
      this.local_data.task = this.todoObj.task;
      this.local_data.description = this.todoObj.description;
      this.dialogRef.close({event:'Cancel'});
      console.log("Todo's after closing " ,this.todoList)
    }

}
