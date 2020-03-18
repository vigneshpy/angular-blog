import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class RegisterComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
