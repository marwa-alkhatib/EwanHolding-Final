import { TranslatePipe } from '../../services/translate.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Companies } from './companies';

describe('Companies', () => {
  let component: Companies;
  let fixture: ComponentFixture<Companies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe, Companies],
    }).compileComponents();

    fixture = TestBed.createComponent(Companies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
