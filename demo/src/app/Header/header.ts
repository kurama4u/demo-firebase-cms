import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from "firebase";


import {
  UserService,
  // CATEGORY, CATEGORIES,
//   POST, POSTS,
  ForumService,
  ApiService, TestService
} from '../../firebase-backend/firebase-backend.module';

@Component({
    selector: "app-header",
    templateUrl: "./header.html"
})
 export class Header {

    form: FormGroup;

    constructor( public user: UserService,){}



    onLoginWithGoogle() {

    this.user.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        console.log("success");
        console.log(res);
      })
      .catch(e => {
        console.log('error: ', e);
      });

  }
  onLoginWithFacebook(){

    this.user.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((res) => {
      console.log('login success');
      console.log(res);
    })
    .catch(e => {
      console.log('error ', e);
    })
  }
 }