import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { ListingComponent } from './listing/listing.component';
import { HomeComponent } from './home/home.component';
import  {HttpClientModule}  from '@angular/common/http';
@NgModule({ 
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    ListingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
