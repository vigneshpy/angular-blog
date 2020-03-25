import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
 user_id:object;
 url:string;
 singleuser:object;
  registerform = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    dob: new FormControl('',Validators.required),
    pass: new FormControl('',[Validators.required, Validators.minLength(6)]),
    gender: new FormControl(''),
    status: new FormControl(''),
    profile_pic: new FormControl(''),

  });
  constructor(private http:HttpClient,private route:ActivatedRoute) { 
  }
  get f() { return this.registerform.controls; }
  onFileChange(event) {
 
    let valid=true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(!this.validateFile(file.name)){
        alert('Invalid File type only png and jpg is allowed');
        this.registerform.patchValue({
          profile_pic: ''
        });
        valid=false;
      }
      if(valid){
        var  reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(event:any)=>{
          this.url=event.target.result;
        }
      this.registerform.patchValue({
        profile_pic: file
      });
    }
     
    }
  }
  validateFile(fname:string){
    var ext = fname.substring(fname.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg'|| ext.toLowerCase() == 'jpeg') {
        return true;
    }
    else {
        return false;
    }
  }

  generateFormData(){
    var formdata=new FormData();
    formdata.append('name', this.registerform.get('name').value);
    formdata.append('email', this.registerform.get('email').value);
    formdata.append('dob', this.registerform.get('dob').value);
    formdata.append('gender', this.registerform.get('gender').value);
    formdata.append('pass', this.registerform.get('pass').value);
    formdata.append('status', this.registerform.get('status').value);
    formdata.append('profile_pic', this.registerform.get('profile_pic').value);
    return formdata;
  }
  saveuser(){
      var formdata=this.generateFormData();
    this.http.post('http://localhost/operations.php?op=insert',formdata).subscribe(
      data=>{
        console.log('Post Request is Successfull'+data);
        
      },
      error=>{
        console.log(error);
      }
    )


  }
updateuser(id){
  var formdata=this.generateFormData();
  this.http.post('http://localhost/operations.php?op=update&user_id='+id,formdata).subscribe(
    data=>{
      console.log('Post Request is Successfull'+data);
      
    },
    error=>{
      console.log(error);
    }
  )

}
  retrive_update(id){
    
    this.http.post('http://localhost/operations.php?op=rupdate',id).subscribe(data=>{
    
      this.registerform.patchValue({
        name:data['name'],
        email:data['email'],
        dob:data['dob'],
        gender:data['gender'],
        status:data['status'],
        profile_pic:data['profile_pic']
      });
      
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
         this.user_id=this.user_id;
         console.log('working');

     }
})

}
}