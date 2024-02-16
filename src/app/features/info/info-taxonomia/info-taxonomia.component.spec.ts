import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTaxonomiaComponent } from './info-taxonomia.component';

describe('InfoTaxonomiaComponent', () => {
  let component: InfoTaxonomiaComponent;
  let fixture: ComponentFixture<InfoTaxonomiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTaxonomiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoTaxonomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
