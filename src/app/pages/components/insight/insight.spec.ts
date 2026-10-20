import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Insight } from './insight';

describe('Insight', () => {
  let component: Insight;
  let fixture: ComponentFixture<Insight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Insight],
    }).compileComponents();

    fixture = TestBed.createComponent(Insight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
