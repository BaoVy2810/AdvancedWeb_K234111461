import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50BookinfoDetailComponent } from './ex50-bookinfo-detail-component';

describe('Ex50BookinfoDetailComponent', () => {
  let component: Ex50BookinfoDetailComponent;
  let fixture: ComponentFixture<Ex50BookinfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50BookinfoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50BookinfoDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
