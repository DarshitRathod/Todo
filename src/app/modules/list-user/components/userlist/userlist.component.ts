
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

  /********************************************** Properties ******************************************/
  public dataSourceUserList;
  userList:any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','actions'];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  /********************************************** Constructor *****************************************/
  constructor(private userDataService:UserdataService,private dialog: MatDialog) { }

  /********************************************** Methods *********************************************/

  ngOnInit(): void {
    this.dataSourceUserList = this.userDataService.getUserData();
    this.userList = this.userDataService.getUserData();

    console.log("Data")
  }

  openAddEditDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '340px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }if(result.event == 'Edit'){
        this.updateRowData(result.data);
      }
    });
  }

  //Add User
  addRowData(row_obj){
    if(this.userDataService.addUser(row_obj)){
      this.table.renderRows();
    }
    this.table.renderRows();
    console.log("After Add Data is ",this.userList);
  }

  //Edit User
  updateRowData(row_obj){
    if(this.userDataService.editUser(row_obj)){
      this.table.renderRows();
    }
    console.log("After Update Data is ",this.userList);
  }

  //Delete User
  deleteRowData(action,row_obj){
    console.log(action)
    if(!this.userDataService.deleteUser(row_obj)){
      const dialogRef = this.dialog.open(DialogAlertComponent, {
        width: '250px',
        data:'Todo Exist For this user'
      });
    }else{
      //If todo not exit for user then delete
      this.table.renderRows();
    }

    console.log("After Delete Data is ",this.userList);
  }

}
