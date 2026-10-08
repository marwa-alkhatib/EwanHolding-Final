import { TranslatePipe } from '../../services/translate.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Investment } from './investment';

describe('Investment', () => {
  let component: Investment;
  let fixture: ComponentFixture<Investment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe, Investment],
    }).compileComponents();

    fixture = TestBed.createComponent(Investment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
