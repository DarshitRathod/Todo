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

  /********************************************** Properties ******************************************/
  form: FormGroup;
  local_data:any;
  errorEmailMessage="";
  userList:any;
  id:number;
  userObj = {
    id:0,
    firstName:"",
    lastName:"",
    email:"",
    action:""
  }

    /********************************************** Constructor ******************************************/
    constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private userDataService:UserdataService,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) private data:UsersData){ }

    /********************************************** Methods ******************************************/
    ngOnInit(): void {
      console.log("Data")
      if(this.data.hasOwnProperty("action")){
        this.userObj.action = "Add";
      }
      if(this.data.hasOwnProperty("id")){
        this.userObj.id = this.data.id;
      }
      if(this.data.hasOwnProperty("email") && this.data.hasOwnProperty("firstName") && this.data.hasOwnProperty("lastName")){
        this.userObj.email = this.data.email;
        this.userObj.firstName = this.data.firstName;
        this.userObj.lastName = this.data.lastName;
        this.local_data = this.data
        this.userObj.action = this.local_data.action;
      }
       this.userList = this.userDataService.getUserData()
    }


    emptyMessage(){
      this.errorEmailMessage = "";
      return true;
    }

    //Validation Perform
    addEditAction(){

    //----------------------------------1-way---------------------------------------------------------
    //Check for Add operation
    if(this.userObj.action === "Add"){
      let flagAddData = true;

    for(let user of this.userList){
      if(((user.email.toString() === this.userObj.email.trim()) && user.id !== this.userObj.id)){
        this.errorEmailMessage = "Email-id already Exists";
        console.log("User list is ",this.userList);
        flagAddData = false;
        break;
      }
    }

    if(flagAddData){

      this.userObj.firstName = this.userObj.firstName.trim();
      this.userObj.lastName = this.userObj.lastName.trim();
      this.userObj.email = this.userObj.email.trim();
      this.userObj.action = this.userObj.action;

      this.dialogRef.close({event:this.userObj.action,data:this.userObj})
      }
    }

    //Check for Update operation
    if(this.userObj.action === "Edit"){

      let isEditData = true;

      //Check for conditions
      for(let user of this.userList){
        if(((user.email.toString() === this.userObj.email.trim()) && user.id !== this.userObj.id)){
          this.errorEmailMessage = "Email-id already Exists";
          console.log("User list is ",this.userList);
          isEditData = false;
          break;
        }
      }

    if(isEditData){
      this.userObj.id = this.userObj.id;
      this.userObj.firstName = this.userObj.firstName.trim();
      this.userObj.lastName = this.userObj.lastName.trim();
      this.userObj.email = this.userObj.email.trim();
      this.userObj.action = this.userObj.action;

      this.dialogRef.close({event:this.userObj.action,data:this.userObj})
    }
    }
  }

    //Close Dialog
    closeDialog(){
    // this.local_data.email = this.temp_mail
    // this.local_data.firstName = this.firstName
    // this.local_data.lastName = this.lastName
    this.dialogRef.close({event:'Cancel'});
    console.log("Closing Dialog ",this.userList);
    }



  //Escape Key Check
  @HostListener('document:keydown.escape', ['$event'])
  randomClick(){
    // this.local_data.email = this.temp_mail
    // this.local_data.firstName = this.firstName
    // this.local_data.lastName = this.lastName
    this.dialogRef.close({event:'Cancel'});
    console.log("Closing Dialog ",this.userList);
  }

}


