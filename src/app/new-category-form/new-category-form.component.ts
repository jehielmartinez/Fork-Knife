import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuItemService } from '../services/menu-item.service';

@Component({
  selector: 'app-new-category-form',
  templateUrl: './new-category-form.component.html',
  styleUrls: ['./new-category-form.component.css']
})
export class NewCategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  category = {};

  constructor(private formBuilder: FormBuilder, private menuItemService: MenuItemService) {
    this.createCategoryForm();
  }
  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      categoryName: '',
    });
  }

  onSubmit() {
    this.category = this.categoryForm.value;
    this.menuItemService.saveCategory(this.category);
    this.categoryForm.reset();

  }

  ngOnInit() {
  }

}
