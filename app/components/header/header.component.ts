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
  userListDTO: UserRequestResponseModel [] = [];
  selectedUser: UserRequestResponseModel = new UserRequestResponseModel();
  isEdit: boolean = false;

  constructor(public userService: UserService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers();
    //company form creation and validations
    this.userFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      image: ['']
    });
  }

  //get function to get the company from controls
  get f() { return this.userFormGroup.controls; }

  createUser() {
    this.userFormSubmitted = true;
    if(!this.userFormGroup.valid) return;

    this.userDTO.firstName = this.userFormGroup.controls['firstName'].value;
    this.userDTO.lastName = this.userFormGroup.controls['lastName'].value;
    this.userDTO.email = this.userFormGroup.controls['email'].value;

    if(this.isEdit) {
      this.userDTO.id = this.selectedUser.id;
      this.userService.updateUser(this.userDTO).subscribe(result => {
        this.isSuccess = true;
        this.getUsers();
      });
    } else {
      this.userService.createUser(this.userDTO).subscribe(result => {
        this.isSuccess = true;
        this.getUsers();
      });
    }
  }

  editUser(user: UserRequestResponseModel) {
    this.userDTO = new UserRequestResponseModel();
    this.selectedUser = user;
    this.isEdit = true;
    this.userFormGroup.controls['firstName'].setValue(user.firstName);
    this.userFormGroup.controls['lastName'].setValue(user.lastName);
    this.userFormGroup.controls['email'].setValue(user.email);
    this.userDTO.imagePath = user.imagePath;
  }

  clearForm() {
    this.userFormGroup.reset();
    this.userFormSubmitted = false;
    this.isEdit = false;
    this.userDTO = new UserRequestResponseModel();
    this.selectedUser = new UserRequestResponseModel();
    this.isSuccess = false;
  }

  getUsers() {
    this.userService.getUsers().subscribe(result => {
      this.userListDTO = result.userList;
      console.log(this.userListDTO);
    });
  }

  deletUser(userId: any) {
    this.userService.deleteUser(userId).subscribe(result => {
      console.log(result);
      this.getUsers();
    })
  }

  UploadImage(event: any) {
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
