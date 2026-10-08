import { TranslatePipe } from '../../services/translate.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HumanResources } from './human-resources';

describe('HumanResources', () => {
  let component: HumanResources;
  let fixture: ComponentFixture<HumanResources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe, HumanResources],
    }).compileComponents();

    fixture = TestBed.createComponent(HumanResources);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
