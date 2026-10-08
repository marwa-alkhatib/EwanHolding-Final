import { TranslatePipe } from '../../services/translate.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenanceOperations } from './maintenance-operations';

describe('MaintenanceOperations', () => {
  let component: MaintenanceOperations;
  let fixture: ComponentFixture<MaintenanceOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe, MaintenanceOperations],
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceOperations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
