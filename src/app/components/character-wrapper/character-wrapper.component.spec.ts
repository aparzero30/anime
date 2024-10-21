import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterWrapperComponent } from './character-wrapper.component';

describe('CharacterWrapperComponent', () => {
  let component: CharacterWrapperComponent;
  let fixture: ComponentFixture<CharacterWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
