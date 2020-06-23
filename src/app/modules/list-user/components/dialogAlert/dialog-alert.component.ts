import { Component, OnInit, Inject,Optional } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {

  msg:string
  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:string)
    {
      this.msg = data
    }


  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
