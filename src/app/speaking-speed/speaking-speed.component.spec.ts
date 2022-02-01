import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingSpeedComponent } from './speaking-speed.component';

describe('SpeakingSpeedComponent', () => {
  let component: SpeakingSpeedComponent;
  let fixture: ComponentFixture<SpeakingSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakingSpeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakingSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
