import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDetailsComponent } from './material-details.component';

describe('MaterialDetailsComponent', () => {
  let component: MaterialDetailsComponent;
  let fixture: ComponentFixture<MaterialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
