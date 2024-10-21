import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPanelComponent } from './popular-panel.component';

describe('PopularPanelComponent', () => {
  let component: PopularPanelComponent;
  let fixture: ComponentFixture<PopularPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
