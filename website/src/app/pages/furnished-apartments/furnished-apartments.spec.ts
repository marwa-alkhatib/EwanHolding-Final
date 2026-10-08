import { TranslatePipe } from '../../services/translate.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FurnishedApartments } from './furnished-apartments';

describe('FurnishedApartments', () => {
  let component: FurnishedApartments;
  let fixture: ComponentFixture<FurnishedApartments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe, FurnishedApartments],
    }).compileComponents();

    fixture = TestBed.createComponent(FurnishedApartments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
