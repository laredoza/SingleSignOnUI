import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionListComponent } from './user-permission-list.component';

describe('UserPermissionListComponent', () => {
  let component: UserPermissionListComponent;
  let fixture: ComponentFixture<UserPermissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPermissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
