import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.css']
})
export class TakeOrderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }
  id = this.route.snapshot.params['id'];

  ngOnInit() {
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.id);
    this.router.navigateByUrl('/dashboard');
  }

}
