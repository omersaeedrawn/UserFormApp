import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import UserService from 'src/app/Services/user.service';
import { UserRequestResponseModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  userFormGroup: FormGroup;
  userFormSubmitted: boolean = false;
  isSuccess: boolean = false;
  userDTO: UserRequestResponseModel = new UserRequestResponseModel();

  constructor(public userService: UserService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //company form creation and validations
    this.userFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      image: ['', [Validators.required]]
    });
  }

  //get function to get the company from controls
  get f() { return this.userFormGroup.controls; }

  createUser() {
    debugger
    this.userFormSubmitted = true;
    if(!this.userFormGroup.valid) return;

    this.userDTO.firstName = this.userFormGroup.controls['firstName'].value;
    this.userDTO.lastName = this.userFormGroup.controls['lastName'].value;
    this.userDTO.email = this.userFormGroup.controls['email'].value;

    this.userService.createUser(this.userDTO).subscribe(result => {
      console.log(result);
      this.isSuccess = true;
    })
  }

  UploadImage(event: any) {
    console.log(event);
    event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
        let str: any = reader.result;
        this.userDTO.imagePath = str;
    };
  }

}
