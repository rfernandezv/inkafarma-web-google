import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponentProduct } from './list.component';

describe('ListComponentProduct', () => {
  let component: ListComponentProduct;
  let fixture: ComponentFixture<ListComponentProduct>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponentProduct ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponentProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
