import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard-screen',
  templateUrl: './dashboard-screen.component.html',
  styleUrls: ['./dashboard-screen.component.css']
})
export class DashboardScreenComponent implements OnInit {

  constructor(private orderService: OrderService, private router: Router, private authService: AuthenticationService) { }
  user = this.authService.getCurrentUser();

    newOrder() {
  const id = Date.now().toString();
  this.orderService.newOrder(id);
  this.router.navigateByUrl(`order/${id}`);
}

ngOnInit() {
}

}
