import { Component, Inject } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  actionBtn: string = 'save';
  productForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.productForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeeMobile: ['', Validators.required],
      employeeSalary: [, Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['employeeId'].setValue(
        this.editData.employeeId
      );
      this.productForm.controls['employeeName'].setValue(
        this.editData.employeeName
      );
      this.productForm.controls['employeeEmail'].setValue(
        this.editData.employeeEmail
      );
      this.productForm.controls['employeeMobile'].setValue(
        this.editData.employeeMobile
      );
      this.productForm.controls['employeeSalary'].setValue(
        this.editData.employeeSalary
      );
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postEmployee(this.productForm.value).subscribe({
          next: (res) => {
            alert('product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('error while adding the product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Employee data updated successfully');
        this.productForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        alert('Error while updating the form');
      },
    });
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
