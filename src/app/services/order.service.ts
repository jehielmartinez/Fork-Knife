import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { MenuItem } from '../models/menu-item.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class OrderService {
    constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

    OrdersRef = this.afs.collection('Orders');

    public newOrder(id) {
        this.OrdersRef.doc(id).set({
            orderId: id,
        })
            .then(function () {
                console.log('Order successfully created!');
            })
            .catch(function (error) {
                console.error('Error Creating Order:', error);
            });
    }

    public plus(menuItem, id) {
        const t = this;
        this.OrdersRef.doc(id).collection('menuItems').doc(menuItem.title).ref.get().then(function (doc) {
            if (doc.exists) {
                console.log(doc.data().howMany);
                t.addToOrder(menuItem, id, doc.data().howMany + 1);
            } else {
                t.addToOrder(menuItem, id, 1);
            }
        });
    }

    public decrease(menuItem, id) {
        const t = this;
        this.OrdersRef.doc(id).collection('menuItems').doc(menuItem.title).ref.get().then(function (doc) {
            if (doc.exists) {
                console.log(doc.data().howMany);
                t.addToOrder(menuItem, id, doc.data().howMany - 1);
            } else {
                console.log('Document not found!');
            }
        });
    }

    public delete(menuItem, id) {
        const t = this;
        this.OrdersRef.doc(id).collection('menuItems').doc(menuItem.title).delete()
        .then(function () {
            console.log('MenuItem successfully deleted!');
        })
        .catch(function (error) {
            console.error('Error removing MenuItem: ', error);
        });
    }


    public addToOrder(menuItem, id, many) {
        this.OrdersRef.doc(id).collection('menuItems').doc(menuItem.title).set({
            title: menuItem.title,
            price: menuItem.price,
            howMany: many
        })
            .then(function () {
                console.log('MenuItem successfully added to ORDER!');
            })
            .catch(function (error) {
                console.error('Error editing Order: ', error);
            });
    }

    public readOrder(id) {
        // tslint:disable-next-line:prefer-const
        let orderList: any = [];
        this.OrdersRef.doc(id).collection('menuItems').ref
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === 'added') {
                        orderList.push(change.doc.data());
                    }
                    if (change.type === 'modified') {
                        const index = orderList.findIndex((menuItem) => menuItem.title === change.doc.data().title);
                        orderList.splice(index, 1, change.doc.data());
                    }
                    if (change.type === 'removed') {
                        const index = orderList.findIndex((menuItem) => menuItem.title === change.doc.data().title);
                        orderList.splice(index, 1);
                    }
                });
            });
        return orderList;
    }

    deleteOrder(id) {
        this.OrdersRef.doc(id).delete()
        .then(function () {
            console.log('Order successfully deleted!');
        })
        .catch(function (error) {
            console.error('Error removing Order: ', error);
        });
    }

}


