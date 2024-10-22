import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTaskExistComponent } from './no-task-exist.component';

describe('NoTaskExistComponent', () => {
  let component: NoTaskExistComponent;
  let fixture: ComponentFixture<NoTaskExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTaskExistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoTaskExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
