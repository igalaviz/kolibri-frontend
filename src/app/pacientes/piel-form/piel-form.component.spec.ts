import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PielFormComponent } from './piel-form.component';

describe('PielFormComponent', () => {
  let component: PielFormComponent;
  let fixture: ComponentFixture<PielFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PielFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PielFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
