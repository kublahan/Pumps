import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpListComponent } from './pump-list.component';

describe('PumpListComponent', () => {
  let component: PumpListComponent;
  let fixture: ComponentFixture<PumpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PumpListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
