import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaContagemComponent } from './nova-contagem.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from '../../core/interceptor/http.interceptor';

describe('NovaContagemComponent', () => {
  let component: NovaContagemComponent;
  let fixture: ComponentFixture<NovaContagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaContagemComponent],
      providers:[provideHttpClient(withInterceptors([httpInterceptor]))]
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
