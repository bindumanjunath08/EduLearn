import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateassignmnetComponent } from './createassignmnet.component';

describe('CreateassignmnetComponent', () => {
  let component: CreateassignmnetComponent;
  let fixture: ComponentFixture<CreateassignmnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateassignmnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateassignmnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
