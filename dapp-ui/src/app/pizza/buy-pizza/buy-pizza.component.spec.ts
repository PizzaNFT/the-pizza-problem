import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPizzaComponent } from './buy-pizza.component';

describe('BuyPizzaComponent', () => {
  let component: BuyPizzaComponent;
  let fixture: ComponentFixture<BuyPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPizzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
