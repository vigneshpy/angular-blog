import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
 
  registerform = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl(''),
    pass: new FormControl(''),
    male: new FormControl(''),
    fmale: new FormControl(''),
    ns: new FormControl(''),
    status: new FormControl(''),
    profile_pic: new FormControl(''),
    operations:new FormControl('insert'),
  });
  constructor(private http:HttpClient) { 
    this.http.get('src/api/operations.php')
  }

  saveuser(){
    'src/api/operations.php';
    console.log(this.registerform.value);
  }

  ngOnInit(): void {
    
  }

}
