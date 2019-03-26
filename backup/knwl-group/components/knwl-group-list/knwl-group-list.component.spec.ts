import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnwlGroupListComponent } from './knwl-group-list.component';

describe('KnwlGroupListComponent', () => {
  let component: KnwlGroupListComponent;
  let fixture: ComponentFixture<KnwlGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnwlGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnwlGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
