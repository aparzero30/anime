import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeWrapperComponent } from './episode-wrapper.component';

describe('EpisodeWrapperComponent', () => {
  let component: EpisodeWrapperComponent;
  let fixture: ComponentFixture<EpisodeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpisodeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
