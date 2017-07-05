import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './Forum/category/category';
import { PostComponent } from './Forum/Post/post';
import { RouterModule, Routes } from '@angular/router';
import { Header } from './Header/header';


import { FirebaseBackendModule } from '../firebase-backend/firebase-backend.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: "category", component: CategoryComponent },
  { path: "post", component: PostComponent }, 
 
];

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    PostComponent,
    Header,
    
    
  ],
  imports: [
    BrowserModule,
    FirebaseBackendModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseBackendModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
