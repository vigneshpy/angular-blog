import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent}   from './register/register.component';
import {ListingComponent} from './listing/listing.component';
import {HomeComponent} from './home/home.component';
import { ControlContainer, NgForm } from '@angular/forms';



const routes: Routes = [
  {path:'adduser',component:RegisterComponent},
  {path:'listing',component:ListingComponent,data:{title:"Listing"}},
  {path:'home',component:HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
