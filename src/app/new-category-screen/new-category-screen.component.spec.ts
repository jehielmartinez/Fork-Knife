import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryScreenComponent } from './new-category-screen.component';

describe('NewCategoryScreenComponent', () => {
  let component: NewCategoryScreenComponent;
  let fixture: ComponentFixture<NewCategoryScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCategoryScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategoryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
