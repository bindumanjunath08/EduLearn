import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardAssignmentComponent } from './reward-assignment.component';

describe('RewardAssignmentComponent', () => {
  let component: RewardAssignmentComponent;
  let fixture: ComponentFixture<RewardAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
