import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTuristearComponent } from './info-turistear.component';

describe('InfoTuristearComponent', () => {
  let component: InfoTuristearComponent;
  let fixture: ComponentFixture<InfoTuristearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTuristearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoTuristearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
