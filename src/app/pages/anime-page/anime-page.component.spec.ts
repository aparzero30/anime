import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimePageComponent } from './anime-page.component';

describe('AnimePageComponent', () => {
  let component: AnimePageComponent;
  let fixture: ComponentFixture<AnimePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
