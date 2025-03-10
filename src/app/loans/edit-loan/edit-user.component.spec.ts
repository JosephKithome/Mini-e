import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodComponent } from './edit-user.component';

describe('EditFoodComponent', () => {
  let component: EditFoodComponent;
  let fixture: ComponentFixture<EditFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
