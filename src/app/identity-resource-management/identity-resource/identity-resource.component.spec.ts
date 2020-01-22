import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityResourceComponent } from './identity-resource.component';

describe('IdentityResourceComponent', () => {
  let component: IdentityResourceComponent;
  let fixture: ComponentFixture<IdentityResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
