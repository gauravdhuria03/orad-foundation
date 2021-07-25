import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsiderComponent } from './insider.component';

describe('InsiderComponent', () => {
  let component: InsiderComponent;
  let fixture: ComponentFixture<InsiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
