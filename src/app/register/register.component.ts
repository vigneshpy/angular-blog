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

  });
  constructor(private http:HttpClient) { 
  }

  saveuser(){
    var data = JSON.stringify(this.registerform.value);
    console.log(this.registerform.value);
    this.http.post('http://localhost/operations.php?op=insert',data).subscribe(
      data=>{
        console.log('Post Request is Successfull'+data);
      },
      error=>{
        console.log(error);
      }
    )


  }

  ngOnInit(): void {
    
  }

}
