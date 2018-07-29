import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  restaurant = {
    name: 'Fork & Knife',
    address: '4a. Av. 12-33 zona 14, ciudad de Guatemala.',
    telephone: '(502)  2539 2748',
    CAI: '01020304830488436',
  };
  tables = [
    { tableNumber: 1, tableName: 'Mesa 1' },
    { tableNumber: 2, tableName: 'Mesa 2' },
    { tableNumber: 3, tableName: 'Mesa 3' }
  ];

  constructor(private orderService: OrderService, private route: ActivatedRoute, private authService: AuthenticationService) { }

  id = this.route.snapshot.params['id'];
  order = {
    orderList: this.orderService.readOrder(this.id),
  };


  plus(menuItem) {
    this.orderService.plus(menuItem, this.id);
  }
  decrease(menuItem) {
    this.orderService.decrease(menuItem, this.id);
  }
  delete(menuItem) {
    this.orderService.delete(menuItem, this.id);
  }
  calcSubtotal() {
    return this.order.orderList.map(t => t.howMany * t.price).reduce((acc, value) => acc + value, 0);
  }
  calcISV() {
    return this.calcSubtotal() * 0.15;
  }
  calcTotal() {
    return this.calcISV() + this.calcSubtotal();
  }


  ngOnInit() { }

}
