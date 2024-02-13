import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTaxonomiaComponent } from './mock-taxonomia.component';

describe('MockTaxonomiaComponent', () => {
  let component: MockTaxonomiaComponent;
  let fixture: ComponentFixture<MockTaxonomiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockTaxonomiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MockTaxonomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
