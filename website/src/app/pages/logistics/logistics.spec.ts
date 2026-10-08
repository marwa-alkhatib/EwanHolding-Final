import { TranslatePipe } from '../../services/translate.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logistics } from './logistics';

describe('Logistics', () => {
  let component: Logistics;
  let fixture: ComponentFixture<Logistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe, Logistics],
    }).compileComponents();

    fixture = TestBed.createComponent(Logistics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
