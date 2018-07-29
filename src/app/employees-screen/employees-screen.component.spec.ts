import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesScreenComponent } from './employees-screen.component';

describe('EmployeesScreenComponent', () => {
  let component: EmployeesScreenComponent;
  let fixture: ComponentFixture<EmployeesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
