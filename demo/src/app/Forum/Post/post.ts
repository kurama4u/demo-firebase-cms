import { Component, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import {
  UserService,
  CATEGORY, CATEGORIES,
  POST, POSTS,
  ForumService,
  ApiService, TestService
} from '../../../firebase-backend/firebase-backend.module';


@Component({
  selector: 'app-post',
  templateUrl: './post.html'
})
export class PostComponent {

    form: FormGroup;
    // category_error: string;
    // category_id: string;
    // category_name: string;
    categories: CATEGORIES = [];

    post_error: string;

    postForm: POST = {
    uid: '',
    name: '',
    categories: [],
    subject: '',
    content: '',

  };
      
    posts: POSTS = [];

    constructor(
                private api: ApiService,
                public user: UserService,
                public forum: ForumService,
                // private fb:FormBuilder
                ){
      api.setBackendUrl('https://us-central1-fir-c4439.cloudfunctions.net/postApi');
    
      this.listenCategory();
      this.loadPosts();
      
    }


  loadPosts() {
    this.posts = [];
    this.forum.postData().once('value').then( s => {
      let obj = s.val();
      if(obj) {
        for( let k of Object.keys( obj ) ) {
        this.posts.unshift( obj[k] );
      }
      }
    });
  }
      
  async testCreatePosts(category, n) {

    let post: POST = { uid: '', categories: [category] };
    for (let i = 0; i < n; i++) {
      post.subject = `${i}th subject.`;
      await this.forum.createPost(post);
    }
  }
  listenCategory() {
    this.forum.observeCategory().subscribe(res => {
      console.log(res);
      this.categories = res;
    });
  }
  onSubmitPostForm() {
    console.log("Going to create a post : ", this.postForm);
   
    this.postForm.categories = Object.keys(this.postForm.categories);
    this.postForm.uid = this.user.uid;
    this.postForm.name = this.user.name;
    this.api.post( this.postForm ).subscribe( key => {
      console.log("Post create with key: ", key);
      this.postForm.categories = [];
      this.loadPosts();
    }, e => {
      console.error(e);
    });

  }
  onClickEdit(post:POST){
    let obj = {};
    for( let c of post.categories ) obj[c] = true;
    this.postForm.categories = <any> obj;
    this.postForm.subject = post.subject;
    this.postForm.content = post.content;
    this.postForm.key = post.key;
  }
  onClickDelete(post:POST){
    let data = {
      uid: post.uid,
      key: post.key,
      function: 'delete'
    }

    this.api.post( data ).subscribe( key => {
      console.log("---------->", key)
    this.loadPosts();
    }, e => { console.log("---------->",e.message); });
 
    }
  

}

      

    





    







  