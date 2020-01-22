import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseMenuAndTitleComponent } from './collapse-menu-and-title.component';

describe('CollapseMenuAndTitleComponent', () => {
  let component: CollapseMenuAndTitleComponent;
  let fixture: ComponentFixture<CollapseMenuAndTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapseMenuAndTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseMenuAndTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
