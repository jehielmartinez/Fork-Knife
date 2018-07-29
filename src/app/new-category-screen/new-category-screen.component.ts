import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../services/menu-item.service';
import { NewItemFormComponent } from '../new-item-form/new-item-form.component';

@Component({
  selector: 'app-new-category-screen',
  templateUrl: './new-category-screen.component.html',
  styleUrls: ['./new-category-screen.component.css']
})
export class NewCategoryScreenComponent implements OnInit {

  constructor(private menuItemService: MenuItemService) { }

  categories = this.menuItemService.updateCategories();
  menuItems = this.menuItemService.updateMenuItems();

  delete(menuItem) {
    this.menuItemService.deleteMenuItem(menuItem);
  }

  ngOnInit() {
  }



}
