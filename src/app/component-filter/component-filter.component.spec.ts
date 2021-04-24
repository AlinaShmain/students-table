import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFilterComponent } from './component-filter.component';

describe('ComponentFilterComponent', () => {
  let component: ComponentFilterComponent;
  let fixture: ComponentFixture<ComponentFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
