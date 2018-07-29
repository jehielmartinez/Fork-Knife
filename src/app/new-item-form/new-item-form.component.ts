import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MenuItem } from '../models/menu-item.model';
import { MenuItemService } from '../services/menu-item.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css']
})
export class NewItemFormComponent implements OnInit {
  itemForm: FormGroup;
  menuItem = {};

  constructor(private formBuilder: FormBuilder, private menuItemService: MenuItemService) {
    this.createitemForm();
  }
  categories = this.menuItemService.getCategories();

  createitemForm() {
    this.itemForm = this.formBuilder.group({
      category: '',
      title: '',
      description: '',
      price: '',
      howMany: '',
      imageURL: '',
      imageName: '',
    });
  }

  onSubmit() {
    this.menuItem = this.itemForm.value;
    this.menuItemService.saveMenuItem(this.menuItem);
    this.itemForm.reset();
  }

  ngOnInit() {
  }

}
