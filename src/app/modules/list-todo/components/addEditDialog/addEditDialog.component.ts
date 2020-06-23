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

  form: FormGroup;
  action:string;
  local_data:any;
  task:string;
  description:string;
  outTask:string;
  outDescription:string;
  errorMessageTask:string;
  errorMessageDescription:string;
  //flag = true;
  id:number;
  userid:number;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public userDataService:UserdataService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:TodoData)
    {
      if(!data.hasOwnProperty("task")){
        this.task = "";
      }if(!data.hasOwnProperty("description")){
        this.description = "";
      }if(data.hasOwnProperty("action")){
        this.action = "Add";
      }
      if(data.hasOwnProperty("id")){
        this.id = data.id;
      }
      if(data.hasOwnProperty("task") && data.hasOwnProperty("description")){
        this.task = data.task;
        this.description = data.description;
        this.local_data = data
        this.action = this.local_data.action;
        this.userid = data.userid;
      }
      console.log("Action is ",this.action)
    }


    //Task and description field check
    doAction(){
      //------------------------1-way--------------------------------------
      if(this.action === 'Add'){
        let obj = {
          task : this.outTask.trim(),
          description : this.outDescription.trim(),
          action:this.action,
          userid:this.userid
        }
        this.dialogRef.close({event:this.action,data:obj})
      }
      if(this.action === 'Edit'){
        let flag = true;

        if(this.outTask === undefined){
          this.outTask = this.task
        }
        if(this.outDescription === undefined){
          this.outDescription= this.description
        }

        if(flag){
          let obj = {
            id:this.id,
            task : this.outTask.trim(),
            description : this.outDescription.trim(),
            action:this.action,
            userid:this.userid
          }
          console.log("after",obj)
          this.dialogRef.close({event:this.action,data:obj})
        }
      }

    }

    //Close Dialog
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
      console.log("Todo's after closing " ,this.userDataService.userAndTodoData['todo'])
    }

    //Escape Key Check
    @HostListener('document:keydown.escape', ['$event'])
    randomClick(){
      this.local_data.task = this.task;
      this.local_data.description = this.description;
      this.dialogRef.close({event:'Cancel'});
      console.log("Todo's after closing " ,this.userDataService.userAndTodoData['todo'])
    }


  ngOnInit(): void {
  }

}
