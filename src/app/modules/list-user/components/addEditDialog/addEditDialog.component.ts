import { Component, OnInit,Inject,Optional,HostListener,Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { DialogAlertComponent } from '../dialogAlert/dialog-alert.component';
import {UserdataService} from '../../../../userdata.service';


export interface UsersData {
  firstName: string;
  lastName: string;
  email : string;
  id:number;
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
  eMail:string;
  process:boolean;
  firstName:string;
  lastName:string;
  outFirstName:string;
  outLastName:string;
  outEmail:string;
  errorEmailMessage="";
  errorFirstNameMessage="";
  errorLastNameMessage="";
  id:number;


    constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public userDataService:UserdataService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:UsersData){
      if(!data.hasOwnProperty("email")){
        this.eMail = "";
      }if(!data.hasOwnProperty("firstName")){
        this.firstName = "";
      }if(!data.hasOwnProperty("lastName")){
        this.lastName = "";
      }if(data.hasOwnProperty("action")){
        this.action = "Add";
      }
      if(data.hasOwnProperty("id")){
        this.id = data.id;
      }
      if(data.hasOwnProperty("email") && data.hasOwnProperty("firstName") && data.hasOwnProperty("lastName")){
        this.eMail = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.local_data = data
        this.action = this.local_data.action;
      }
    }

    emptyMessage(){
      this.errorEmailMessage = "";
      return true;
    }

    //Validation Perform
    doAction(){

    //----------------------------------1-way---------------------------------------------------------
    //Check for Add operation
    if(this.action === "Add"){
      let flagAddData = true;

    for(let user of this.userDataService.userAndTodoData['user']){
      if(((user.email.toString() === this.outEmail.trim()) && user.id !== this.id)){
        this.errorEmailMessage = "Email-id already Exists";
        console.log("User list is ",this.userDataService.userAndTodoData['user']);
        flagAddData = false;
        break;
      }
    }

    if(flagAddData){
      let obj;
      if(this.action === "Add"){
        obj = {
          firstName : this.outFirstName.trim(),
          lastName : this.outLastName.trim(),
          email : this.outEmail.trim(),
          action : this.action
        }
      }
      this.dialogRef.close({event:this.action,data:obj})
    }
    }

    //Check for Update operation
    if(this.action === "Edit"){

      let flagEditData = true

      if(this.outEmail === undefined){
        this.outEmail = this.eMail
      }
      if(this.outFirstName === undefined){
        this.outFirstName = this.firstName
      }
      if(this.outLastName === undefined){
        this.outLastName = this.lastName
      }
      //Check for conditions
      for(let user of this.userDataService.userAndTodoData['user']){
        if(((user.email.toString() === this.outEmail.trim()) && user.id !== this.id)){
          this.errorEmailMessage = "Email-id already Exists";
          console.log("User list is ",this.userDataService.userAndTodoData['user']);
          flagEditData = false;
          break;
        }
      }

    if(flagEditData){
      let obj;
         obj = {
          id:this.id,
          firstName : this.outFirstName.trim(),
          lastName : this.outLastName.trim(),
          email : this.outEmail.trim(),
          action : this.action
        }
      this.dialogRef.close({event:this.action,data:obj})
    }
  }
  }

    //Close Dialog
    closeDialog(){
    // this.local_data.email = this.temp_mail
    // this.local_data.firstName = this.firstName
    // this.local_data.lastName = this.lastName
    this.dialogRef.close({event:'Cancel'});
    console.log("Closing Dialog ",this.userDataService.userAndTodoData['user']);
    }



  //Escape Key Check
  @HostListener('document:keydown.escape', ['$event'])
  randomClick(){
    // this.local_data.email = this.temp_mail
    // this.local_data.firstName = this.firstName
    // this.local_data.lastName = this.lastName
    this.dialogRef.close({event:'Cancel'});
    console.log("Closing Dialog ",this.userDataService.userAndTodoData['user']);
  }


  ngOnInit(): void {
    console.log("Data")
  }

}


