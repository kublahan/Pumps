import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorFormComponent } from './motor-form.component';

describe('MotorFormComponent', () => {
  let component: MotorFormComponent;
  let fixture: ComponentFixture<MotorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
