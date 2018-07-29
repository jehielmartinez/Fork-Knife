import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { Category } from '../models/category.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';


@Injectable()
export class MenuItemService {
    constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

    categoriesRef = this.afs.collection('Categories');
    menuItemsRef = this.afs.collection('MenuItems');

    getCategories() {
        // tslint:disable-next-line:prefer-const
        let categories: any = [];
        this.categoriesRef.ref.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                categories.push(doc.data());
            });
        });
        console.log(categories);
        return categories;
    }

    saveCategory(category) {
        this.categoriesRef.doc(category.categoryName).set(category)
            .then(function () {
                console.log('Category successfully written!');
            })
            .catch(function (error) {
                console.error('Error Creating Category: ', error);
            });
    }

    updateCategories() {
        // tslint:disable-next-line:prefer-const
        let categories: any = [];
        this.categoriesRef.ref
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === 'added') {
                        categories.push(change.doc.data());
                    }
                    if (change.type === 'modified') {
                    }
                    if (change.type === 'removed') {
                    }
                });
            });
        return categories;
    }

    saveMenuItem(menuItem) {
        this.uploadFile(menuItem);
        menuItem.imageName = `images/${menuItem.imageURL.files[0].name}`;
        menuItem.imageURL = '';
        this.menuItemsRef.doc(menuItem.title).set(menuItem)
            .then(function () {
                console.log('MenuItem successfully added!');
            })
            .catch(function (error) {
                console.error('Error adding MenuItem: ', error);
            });
    }

    uploadFile(menuItem) {
        const file = menuItem.imageURL.files[0];
        const filePath = `images/${menuItem.imageURL.files[0].name}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, file).then(() => this.getImageURL(fileRef, menuItem.title));
    }

    getImageURL(fileRef, menuItemTitle) {
        let downloadURL: string;
        const t = this;
        fileRef.getDownloadURL().toPromise().then(function (url) {
            downloadURL = url;
            t.menuItemsRef.doc(menuItemTitle).update({
                'imageURL': downloadURL
            });
            console.log(downloadURL);
        }).catch(function (error) {
            console.log(error);
        });
    }

    updateMenuItems() {
        // tslint:disable-next-line:prefer-const
        let menu: any = [];
        const t = this;
        this.menuItemsRef.ref
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === 'added') {
                        menu.push(change.doc.data());
                        console.log('added!');

                    }
                    if (change.type === 'modified') {
                        const index = menu.findIndex((menuItem) => menuItem.title === change.doc.data().title);
                        menu.splice(index, 1, change.doc.data());
                        console.log('modified!');

                    }
                    if (change.type === 'removed') {
                        const index = menu.findIndex((menuItem) => menuItem.title === change.doc.data().title);
                        menu.splice(index, 1);
                        console.log('removed!');


                    }
                });
            });
        return menu;
    }

    getMenuItems() {
        // tslint:disable-next-line:prefer-const
        let menu: any = [];
        this.menuItemsRef.ref.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                menu.push(doc.data());
            });
        });
        return menu;
    }

    deleteMenuItem(menuItem) {
        this.deleteImage(menuItem.imageName);
        this.menuItemsRef.doc(menuItem.title).delete()
            .then(function () {
                console.log('MenuItem successfully deleted!');
            })
            .catch(function (error) {
                console.error('Error removing MenuItem: ', error);
            });

    }
    deleteImage(imageName) {
        this.storage.ref(imageName).delete().toPromise().then(function () {
            console.log('File deleted');
        }).catch(function (error) {
            console.log('Error deleting file: ', error);
        });
    }
}
