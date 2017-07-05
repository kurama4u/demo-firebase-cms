import { Component, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  UserService,
  CATEGORY, CATEGORIES,
  ForumService,
  ApiService, TestService
} from './../../../firebase-backend/firebase-backend.module';


@Component({
  selector: 'app-category',
  templateUrl: './category.html'
})
export class CategoryComponent {

    form: FormGroup;
    category_error: string;
    category_id: string;
    category_name: string;
    categories: CATEGORIES = [];

    constructor(
                private api: ApiService,
                test: TestService,
                public user: UserService,
                public forum: ForumService,
                private fb:FormBuilder
                ){
                  
      this.listenCategory();
      this.loadForm();

    }
  
    loadForm() {
      this.form = this.fb.group({
        category_id:[''],
        category_name:[''],
      })
    }


  onClickCreateCategory() {

    let category = { id: this.form.value.category_id, name: this.form.value.category_name };
    this.forum.createCategory(category)
      .then(id => {
        this.loadForm();
       })
      .catch(e => {
        console.log(e);
      });
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
  }

  listenCategory() {
    this.forum.observeCategory().subscribe(res => {
      console.log(res);
      this.categories = res;
    });
  }
  
}

      

    





    







  