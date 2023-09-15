import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuPlayerComponent } from './cpu-player.component';

describe('CpuPlayerComponent', () => {
  let component: CpuPlayerComponent;
  let fixture: ComponentFixture<CpuPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CpuPlayerComponent]
    });
    fixture = TestBed.createComponent(CpuPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
