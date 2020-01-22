import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResourceListComponent } from './api-resource-list.component';

describe('ApiResourceListComponent', () => {
  let component: ApiResourceListComponent;
  let fixture: ComponentFixture<ApiResourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiResourceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
