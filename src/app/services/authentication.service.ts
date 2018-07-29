import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth, private afs: AngularFirestore) { }
  usersRef = this.afs.collection('Users');

  public signup(user) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        console.log('User registred');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public uploadUser(user) {
    this.usersRef.doc(user.name).set({
      name: user.name,
      age: user.age,
      photoURL: user.photoURL,
      address: user.address,
      telephone: user.telephone,
      email: user.email,
    })
      .then(function () {
        console.log('User succesfully created on DB');
      })
      .catch(function (error) {
        console.error('Error Creating User: ', error);
      });
  }

  public signin(user) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        console.log('User Logged in');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public getCurrentUser() {
    return this.angularFireAuth.auth;
  }

  public updateUsersList() {
    // tslint:disable-next-line:prefer-const
    let userList: any = [];
    this.usersRef.ref
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            userList.push(change.doc.data());
          }
          if (change.type === 'modified') {
            const index = userList.findIndex((user) => user.email === change.doc.data().email);
            userList.splice(index, 1, change.doc.data());
          }
          if (change.type === 'removed') {
            const index = userList.findIndex((user) => user.email === change.doc.data().email);
            userList.splice(index, 1);
          }
        });
      });
      console.log(userList);
    return userList;
  }
  getUsers() {
    // tslint:disable-next-line:prefer-const
    let userList: any = [];
    this.usersRef.ref.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            userList.push(doc.data());
        });
    });
    return userList;
}
}
