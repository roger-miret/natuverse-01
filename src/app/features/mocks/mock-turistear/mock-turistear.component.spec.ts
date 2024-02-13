import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTuristearComponent } from './mock-turistear.component';

describe('MockTuristearComponent', () => {
  let component: MockTuristearComponent;
  let fixture: ComponentFixture<MockTuristearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockTuristearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MockTuristearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
