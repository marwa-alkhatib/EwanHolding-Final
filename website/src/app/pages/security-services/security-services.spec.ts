import { TranslatePipe } from '../../services/translate.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityServices } from './security-services';

describe('SecurityServices', () => {
  let component: SecurityServices;
  let fixture: ComponentFixture<SecurityServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe, SecurityServices],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
