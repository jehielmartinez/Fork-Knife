import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { Category } from '../models/category.model';
import { MenuItemService } from '../services/menu-item.service';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css']
})

export class MenuItemListComponent implements OnInit {
  id: any = null;
  constructor(private menuItemService: MenuItemService, private orderService: OrderService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  categories = this.menuItemService.updateCategories();
  menuItems = this.menuItemService.updateMenuItems();

  ngOnInit() { }

  addToOrder(menuItem) {
      this.orderService.plus(menuItem, this.id);
  }
}
