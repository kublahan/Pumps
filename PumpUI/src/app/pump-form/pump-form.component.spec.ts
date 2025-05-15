import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpFormComponent } from './pump-form.component';

describe('PumpFormComponent', () => {
  let component: PumpFormComponent;
  let fixture: ComponentFixture<PumpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PumpFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
