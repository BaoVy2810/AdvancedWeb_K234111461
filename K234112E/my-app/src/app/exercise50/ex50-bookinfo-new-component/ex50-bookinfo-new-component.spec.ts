import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50BookinfoNewComponent } from './ex50-bookinfo-new-component';

describe('Ex50BookinfoNewComponent', () => {
  let component: Ex50BookinfoNewComponent;
  let fixture: ComponentFixture<Ex50BookinfoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50BookinfoNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50BookinfoNewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
