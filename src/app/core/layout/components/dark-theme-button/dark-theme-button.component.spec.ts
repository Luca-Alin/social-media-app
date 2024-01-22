import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkThemeButtonComponent } from './dark-theme-button.component';

describe('DarkThemeButtonComponent', () => {
  let component: DarkThemeButtonComponent;
  let fixture: ComponentFixture<DarkThemeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkThemeButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DarkThemeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
