import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTasksComponent } from './list-of-tasks.component';

describe('ListOfTasksComponent', () => {
  let component: ListOfTasksComponent;
  let fixture: ComponentFixture<ListOfTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
