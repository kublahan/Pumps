import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorDetailsComponent } from './motor-details.component';

describe('MotorDetailsComponent', () => {
  let component: MotorDetailsComponent;
  let fixture: ComponentFixture<MotorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
