import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaContagemComponent } from './nova-contagem.component';

describe('NovaContagemComponent', () => {
  let component: NovaContagemComponent;
  let fixture: ComponentFixture<NovaContagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaContagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaContagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
