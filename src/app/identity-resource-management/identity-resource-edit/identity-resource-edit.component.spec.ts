import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityResourceEditComponent } from './identity-resource-edit.component';

describe('IdentityResourceEditComponent', () => {
  let component: IdentityResourceEditComponent;
  let fixture: ComponentFixture<IdentityResourceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityResourceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityResourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
