import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCornerComponent } from './my-corner.component';

describe('MyCornerComponent', () => {
  let component: MyCornerComponent;
  let fixture: ComponentFixture<MyCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCornerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
