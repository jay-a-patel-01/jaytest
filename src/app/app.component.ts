import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';

interface User {
  name: string;
  age: any;
  phone: string;
  newsletter: any;
  gender: string;
  isEdit: boolean;
}
interface Gender {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UserMangaement_Frontend';
  users: User[] = [];
  genders: Gender[] = [{ id: 'M', name: "Male" }, { id: 'F', name: "Female" }, { id: 'O', name: "Other" }]
  tempuser: any;
  Error: any;
  isValid:boolean = false;
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      age: new FormControl('',  [Validators.required, Validators.min(18), Validators.max(100)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)] ),
      newsletter: new FormControl(false),
      gender: new FormControl('', Validators.required)
    });
  }

  
  get name() { return this.myForm.get('name'); }
  get age() { return this.myForm.get('age'); }
  get phone() { return this.myForm.get('phone'); }
  get newsletter() { return this.myForm.get('newsletter'); }
  get gender() { return this.myForm.get('gender'); }

  ngOnInit(): void {
    
   
  }

  onSubmit(user:User){
    this.onSave(user)
    if(this.isValid){
      this.users.push(user)
    }
    this.isValid=false
   
  }
  
  onAdd() {
    this.users.push(
      {
        name: "",
        age: null,
        phone: '',
        newsletter: null,
        gender: '',
        isEdit: false
      })
  }

  onEdit(item: User) {
    localStorage.setItem('oldval', JSON.stringify(item))
    this.users.forEach(element => {
      element.isEdit = false;
    })
    item.isEdit = true;

  }

  onDelete(user: User) {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }

  onSave(user: User) {
    //validate name
    this.Error = "";
    if (!/^[a-zA-Z\s]*$/.test(user.name) || !(user.name)) {
      //alert("Name must contain only letters and spaces.");
      this.Error = "Name must contain letters,spaces and can not be empty feild."
      return;
    }

    // Validate age
    if (!user.age || !/^\d{1,3}$/.test(user.age.toString()) || user.age == 0) {
      //alert('Please enter a valid age. Only numbers are allowed with minimum 1 character and maximum 3.');
      this.Error = 'Please enter a valid age.Zero is not valid and Only numbers are allowed with minimum 1 character and maximum 3.'
      return;
    }
    // validate phone number
    if (!user.phone || !/^\d{10,10}$/.test(user.phone)) {

      //alert('Please enter a valid phone number. Only numbers are allowed.');
      this.Error = 'Please enter a valid phone number of 10 digits'
      return;
    }

    // Validate gender
    if (!user.gender) {
      // alert('Please select a gender.');
      this.Error = 'Please select a gender.'
      return;
    }
    this.isValid=true

    //  const index = this.users.indexOf(user);
    //  this.users[index] = user; 
     user.isEdit = false;

  }

  onCancel(user: User) {

    // If user cancelled adding a new record, store old value
    const index = this.users.indexOf(user);
    let tempuser: any = localStorage.getItem('oldval');
    tempuser = JSON.parse(tempuser);
    this.users[index] = tempuser;
    user.isEdit = false;
  }
}
