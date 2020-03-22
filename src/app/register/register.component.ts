import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
 user_id:object;
 singleuser:object;
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
  constructor(private http:HttpClient,private route:ActivatedRoute) { 
  }

  saveuser(){
    var data = JSON.stringify(this.registerform.value);
    console.log(this.registerform.value);
    this.http.post('http://vickypotter2516.000webhostapp.com/operations.php?op=insert',data).subscribe(
      data=>{
        console.log('Post Request is Successfull'+data);
        
      },
      error=>{
        console.log(error);
      }
    )


  }
updateuser(id){
  var data = JSON.stringify(this.registerform.value);
  console.log(this.registerform.value);
  this.http.post('http://vickypotter2516.000webhostapp.com/operations.php?op=update&user_id='+id,data).subscribe(
    data=>{
      console.log('Post Request is Successfull'+data);
      
    },
    error=>{
      console.log(error);
    }
  )

}
  retrive_update(id){
    this.http.post('http://vickypotter2516.000webhostapp.com/operations.php?op=rupdate',id).subscribe(data=>{
      console.log(data);
      this.registerform.patchValue({
        name:data['name'],
        email:data['email'],
        dob:data['dob'],
        male:data['gender'],
        fmale:data['gender'],
        ns:data['gender'],
        status:data['status'],
        profile_pic:data['profile_pic']
      });
      this.user_id=id
      // this.singleuser=data;
    },error=>{
      console.log(error)
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.user_id=params['params'].id;
     if(typeof this.user_id!='undefined'){
       this.retrive_update(this.user_id);
     }
})

}
}