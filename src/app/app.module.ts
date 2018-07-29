
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatExpansionModule,
  MatSelectModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatTooltip,
  MatTooltipModule,
  MatTableModule
} from '@angular/material';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { AppComponent } from './app.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { TakeOrderComponent } from './take-order/take-order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { MenuItemService } from './services/menu-item.service';
import { OrderService } from './services/order.service';
import { NewCategoryScreenComponent } from './new-category-screen/new-category-screen.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';
import { NewCategoryFormComponent } from './new-category-form/new-category-form.component';
import { DashboardScreenComponent } from './dashboard-screen/dashboard-screen.component';

import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { EmployeesScreenComponent } from './employees-screen/employees-screen.component';

const appRoutes: Routes = [
  { path: '', component: DashboardScreenComponent },
  { path: 'newCategory', component: NewCategoryScreenComponent },
  { path: 'dashboard', component: DashboardScreenComponent },
  { path: 'order/:id', component: TakeOrderComponent },
  { path: 'employees', component: EmployeesScreenComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuItemListComponent,
    TakeOrderComponent,
    OrderListComponent,
    NewCategoryScreenComponent,
    NewItemFormComponent,
    NewCategoryFormComponent,
    DashboardScreenComponent,
    SignupFormComponent,
    SigninFormComponent,
    EmployeesScreenComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'fork-knife'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [MenuItemService, OrderService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
