import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Blogslist } from './blogslist';

describe('Blogslist', () => {
  let component: Blogslist;
  let fixture: ComponentFixture<Blogslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blogslist],
    }).compileComponents();

    fixture = TestBed.createComponent(Blogslist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
