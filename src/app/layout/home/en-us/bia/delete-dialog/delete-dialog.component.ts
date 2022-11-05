import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  public departmentId = 0;
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user,
    public fb: FormBuilder,
    private httpService: HttpRequestService,
    public snackBar: MatSnackBar) {

  }
  async ngOnInit() {
    console.log(this.user, 'userrrrrrrrrrrrrrrrrrrrrrr');
    if (this.user) {
      this.departmentId = this.user.userData;
    } else {

    }
  }
  delete() {
    this.httpService.getRequest('GET', 'DELETEBIA', `id=${Number(this.departmentId)}`).subscribe(res => {
      if (res == 1) {
        this.dialogRef.close(res);
        this.snackBar.open('BIA Program Deleted Succesfully', 'Success', {
          duration: 2000,
        })
      }
    }, (err) => {
      this.snackBar.open(err, 'Error', {
        duration: 2000,
      })
    })
  }
  close(): void {
    this.dialogRef.close();
  }
}
