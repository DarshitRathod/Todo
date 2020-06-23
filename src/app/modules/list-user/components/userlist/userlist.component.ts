
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from '../addEditDialog/addEditDialog.component';
import { DialogAlertComponent } from './../dialogAlert/dialog-alert.component';
import { UserdataService } from './../../../../userdata.service';
import { Component, OnInit ,ViewChild,NgZone, Renderer2, ElementRef} from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [RouterModule]
})
export class UserlistComponent implements OnInit {


  constructor(private userDataService:UserdataService,public dialog: MatDialog) { }

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  public dataSource;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','actions'];

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '340px',
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

  //Add User
  addRowData(row_obj){
    //Check for email exist or not
    if(this.userDataService.addUser(row_obj)){
      this.table.renderRows();
    }
    this.table.renderRows();
    console.log("After Add Data is ",this.userDataService.userAndTodoData['user']);
  }

  //Edit User
  updateRowData(row_obj){
    //console.log("Obj is ",row_obj)

    if(this.userDataService.editUser(row_obj)){
      this.table.renderRows();
    }
    console.log("After Update Data is ",this.userDataService.userAndTodoData['user']);
  }

  //Delete User
  deleteRowData(action,row_obj){

    if(!this.userDataService.deleteUser(row_obj)){
      const dialogRef = this.dialog.open(DialogAlertComponent, {
        width: '250px',
        data:'Todo Exist For this user'
      });
    }else{
      //If todo not exit for user then delete
      this.table.renderRows();
    }

    console.log("After Delete Data is ",this.userDataService.userAndTodoData['user']);
  }

  errorRowData(){
    console.log("Closing Box")
    console.log("After Closing box ,  Data is ",this.userDataService.userAndTodoData['user']);
  }

  ngOnInit(): void {
    this.dataSource = this.userDataService.userAndTodoData['user'];
    console.log("Data")
  }

}
