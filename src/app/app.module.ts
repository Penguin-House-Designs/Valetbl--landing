import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarModule } from 'ng-sidebar';
import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { GoogleppComponent } from './googlepp/googlepp.component';
import { AppleppComponent } from './applepp/applepp.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.router'


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    GoogleppComponent,
    AppleppComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RouterModule,
    routes
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
