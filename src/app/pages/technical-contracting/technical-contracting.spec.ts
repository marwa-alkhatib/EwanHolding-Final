import { TranslatePipe } from '../../services/translate.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicalContracting } from './technical-contracting';

describe('TechnicalContracting', () => {
  let component: TechnicalContracting;
  let fixture: ComponentFixture<TechnicalContracting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe, TechnicalContracting],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalContracting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
