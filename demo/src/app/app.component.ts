import { Component, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  UserService,
} from '../firebase-backend/firebase-backend.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
        constructor(public user: UserService) { }
 }
  

      

    





    







  