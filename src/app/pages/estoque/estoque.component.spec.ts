import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstoqueComponent } from './estoque.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from '../../core/interceptor/http.interceptor';

describe('EstoqueComponent', () => {
  let component: EstoqueComponent;
  let fixture: ComponentFixture<EstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueComponent],
      providers:[provideHttpClient(withInterceptors([httpInterceptor]))]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
