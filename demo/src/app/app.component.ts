import { Component, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';

import {
  UserService,
  CATEGORY, CATEGORIES,
  POST, POSTS,
  ForumService,
  ApiService, TestService
} from '../firebase-backend/firebase-backend.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    category_error: string;
    category_id: string;
    category_name: string;
    categories: CATEGORIES = [];

      post_error: string;

      postForm: POST = {
      uid: '',
      name: '',
      categories: [],
      subject: '',
      content: ''
  };

    posts: POSTS = [];
  
    constructor(
                private api: ApiService,
                test: TestService,
                public user: UserService,
                public forum: ForumService
                ){
      api.setBackendUrl('https://us-central1-fir-c4439.cloudfunctions.net/postApi');

      // this.loadPosts();

      this.listenCategory();
    }

  // loadPosts() {
  //   this.posts = [];
  //   this.forum.postData().once('value').then( s => {
  //     let obj = s.val();
  //     if(obj) {
  //       for( let k of Object.keys( obj ) ) {
  //       this.posts.unshift( obj[k] );
  //     }
  //     }
      
  //   });
  // }

  async testCreatePosts(category, n) {

    let post: POST = { uid: '', categories: [category] };
    for (let i = 0; i < n; i++) {
      post.subject = `${i}th subject.`;
      await this.forum.createPost(post);
    }
  }

 onClickLoginWithGoogle() {

    this.user.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        console.log("success");
        console.log(res);
      })
      .catch(e => {
        console.log('error: ', e);
      });

  }

  onClickCreateCategory() {
    console.log(`Create: ${this.category_name}`);

    let category = { id: this.category_id, name: this.category_name };
    this.forum.createCategory(category)
      .then(id => { })
      .catch(e => console.log(e));
      
      

  }

  getCategories() {
    this.forum.getCategories()
      .then(categories => this.categories)
      .catch(e => this.category_error = e.message);
  }

  onClickCategoryEdit(id) {
    console.log(`Going to edit: ${id}`);
    let c = this.categories.find(v => v.id == id);
    console.log(c);

    let category = { id: c.id, name: c['name'], description: c['description'] };
    this.forum.editCategory(category)
      .then(category_id => { })
      .catch(e => this.category_error = e.message);
  }
   onClickCategoryDelete(id) {

    this.forum.deleteCategory(id)
      .then(() => { })
      .catch(e => this.category_error = e.message);

    // this.forum.deleteCategory( id, () => console.log("Category deleted"), e => console.error(e) );

  }

  listenCategory() {
    this.forum.observeCategory().subscribe(res => {
      this.categories = res;
    });
  }
  
}