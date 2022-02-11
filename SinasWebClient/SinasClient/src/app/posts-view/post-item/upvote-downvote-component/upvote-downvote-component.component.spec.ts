import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpvoteDownvoteComponentComponent } from './upvote-downvote-component.component';

describe('UpvoteDownvoteComponentComponent', () => {
  let component: UpvoteDownvoteComponentComponent;
  let fixture: ComponentFixture<UpvoteDownvoteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpvoteDownvoteComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpvoteDownvoteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
