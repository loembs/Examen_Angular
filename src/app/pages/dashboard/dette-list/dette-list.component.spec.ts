import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetteListComponent } from './dette-list.component';

describe('DetteListComponent', () => {
  let component: DetteListComponent;
  let fixture: ComponentFixture<DetteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
